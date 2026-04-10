const PERMISSIONS = {
	READ: 1, // 0001
	CREATE: 2, // 0010
	UPDATE: 4, // 0100
	DELETE: 8, // 1000
};

const recoursesRole = {
	users: {
		login: PERMISSIONS.READ,
		register: PERMISSIONS.CREATE,
		delete: PERMISSIONS.DELETE,
		update: PERMISSIONS.UPDATE,
	},
};

export const RoleSchema = z.enum(['ADMIN', 'SUPPORT', 'SELLER', 'CUSTOM']);
export type Role = z.infer<typeof RoleSchema>;

export type RolePolicies = Record<Role, Acl>;

export const rolePolicies: Record<Role, Acl> = {
	// admin pode ter MENOS: aqui é só exemplo
	ADMIN: {
		users: PERMISSIONS.READ | PERMISSIONS.UPDATE, // 0101 = 5
		orders: 15,
		products: 15,
	},

	SUPPORT: {
		users: PERMISSIONS.READ, // 1
		orders: PERMISSIONS.READ | PERMISSIONS.UPDATE, // 5
		products: 0,
	},

	SELLER: {
		products: 15,
		orders: PERMISSIONS.READ | PERMISSIONS.UPDATE, // 5
		users: 0,
	},

	// custom normalmente começa vazio (depende do que você quer)
	CUSTOM: {},
};

type User = {
	id: number;
	name: string;
	role: Acl;
};

const Accounts: User[] = [
	{
		id: 1,
		name: 'Admin User',
		role: rolePolicies.ADMIN,
	},
	{
		id: 2,
		name: 'Matheus',
		role: rolePolicies.SUPPORT,
	},
];

export function hasPermission(userPerm: number, permission: number) {
	return (userPerm & permission) === permission;
}

/* 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */

import { z } from 'zod';

/** CRUD bitmask (DUCR) */
export const Perm = {
	READ: 1, // 0001
	CREATE: 2, // 0010
	UPDATE: 4, // 0100
	DELETE: 8, // 1000
} as const;

export type CrudMask = number;

export function hasMask(have: CrudMask, need: CrudMask) {
	return (have & need) === need;
}

/** Zod */
export const CrudMaskSchema = z.number().int().min(0).max(15);

export const ResourceSchema = z.string().min(1).max(64); // ex: "users", "orders"
export type Resource = z.infer<typeof ResourceSchema>;

/** ACL por recurso: { "users": 7, "orders": 15 } */
export const AclSchema = z.record(ResourceSchema, CrudMaskSchema);
export type Acl = z.infer<typeof AclSchema>;

/* 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */

/**
 * identity/claims do usuário (vem do seu auth)
 * - role: define o "base"
 * - acl: overrides customizados por recurso (opcional)
 * - attrs: atributos usados no ABAC (tenant, flags, etc.)
 */
export const UserClaimsSchema = z.object({
	id: z.string().min(1),
	role: RoleSchema,
	tenantId: z.string().min(1).optional(),
	acl: AclSchema.optional(),
	attrs: z.record(z.string(), z.any()).optional(),
});

export type UserClaims = z.infer<typeof UserClaimsSchema>;

/** Contexto ABAC (quem é o dono, tenant do recurso, etc.) */
export const AbacContextSchema = z
	.object({
		resourceOwnerId: z.string().optional(),
		resourceTenantId: z.string().optional(),
		// você pode adicionar mais: status, plan, ip, etc
	})
	.passthrough();

export type AbacContext = z.infer<typeof AbacContextSchema>;

/* 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */

/** Base RBAC: o role define permissões padrão */
/*export const RolePolicies: Record<Role, Acl> = {
	// admin pode ter MENOS: aqui é só exemplo
	admin: {
		users: Perm.READ | Perm.UPDATE, // 0101 = 5
		orders: 15,
		products: 15,
	},

	support: {
		users: Perm.READ, // 1
		orders: Perm.READ | Perm.UPDATE, // 5
	},

	seller: {
		products: 15,
		orders: Perm.READ | Perm.UPDATE, // 5
	},

	// custom normalmente começa vazio (depende do que você quer)
	custom: {},
};*/

/** ABAC rules por recurso (opcional) */
type AbacRule = (args: {
	user: UserClaims;
	action: CrudMask;
	resource: string;
	ctx: AbacContext;
}) => boolean;

export const AbacRules: Record<string, AbacRule[]> = {
	// Ex: só pode UPDATE/DELETE se for dono do recurso
	users: [
		({ user, action, ctx }) => {
			const isWrite =
				hasMask(action, Perm.UPDATE) || hasMask(action, Perm.DELETE);
			if (!isWrite) return true;
			return ctx.resourceOwnerId === user.id;
		},
	],

	// Ex: sempre exigir tenant match (multi-tenant)
	orders: [
		({ user, ctx }) => {
			if (!user.tenantId) return false;
			return ctx.resourceTenantId === user.tenantId;
		},
	],
};

/* 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */

export class AccessControl {
	/** Estratégia de merge: base OR custom (mais permissivo) */
	private mergeAcl(base: Acl, custom?: Acl): Acl {
		if (!custom) return base;
		const out: Acl = { ...base };

		for (const [res, mask] of Object.entries(custom)) {
			// OR: adiciona permissões extras (custom pode aumentar)
			// Se você quiser "subtrair" permissões, use deny mask separado (recomendado).
			out[res] = (out[res] ?? 0) | mask;
		}
		return out;
	}

	/** Permissão efetiva (RBAC + override) */
	public effectiveAcl(user: UserClaims): Acl {
		const base = RolePolicies[user.role] ?? {};
		return this.mergeAcl(base, user.acl);
	}

	/** Checa ABAC rules */
	private abacAllows(
		user: UserClaims,
		resource: string,
		action: CrudMask,
		ctx: AbacContext,
	): boolean {
		const rules = AbacRules[resource];
		if (!rules || rules.length === 0) return true;
		return rules.every((fn) => fn({ user, resource, action, ctx }));
	}

	/** Autoriza ação em recurso */
	public can(input: {
		user: unknown;
		resource: unknown;
		action: unknown; // CrudMask
		ctx?: unknown;
	}): { ok: true } | { ok: false; reason: string } {
		const parsedUser = UserClaimsSchema.safeParse(input.user);
		if (!parsedUser.success)
			return { ok: false, reason: 'INVALID_USER_CLAIMS' };

		const parsedRes = ResourceSchema.safeParse(input.resource);
		if (!parsedRes.success) return { ok: false, reason: 'INVALID_RESOURCE' };

		const parsedAct = CrudMaskSchema.safeParse(input.action);
		if (!parsedAct.success) return { ok: false, reason: 'INVALID_ACTION_MASK' };

		const parsedCtx = input.ctx
			? AbacContextSchema.safeParse(input.ctx)
			: { success: true as const, data: {} as AbacContext };
		if (!parsedCtx.success)
			return { ok: false, reason: 'INVALID_ABAC_CONTEXT' };

		const user = parsedUser.data;
		const resource = parsedRes.data;
		const action = parsedAct.data;
		const ctx = parsedCtx.data;

		const acl = this.effectiveAcl(user);
		const haveMaskForResource = acl[resource] ?? 0;

		// RBAC + override
		if (!hasMask(haveMaskForResource, action)) {
			return { ok: false, reason: 'RBAC_DENY' };
		}

		// ABAC
		if (!this.abacAllows(user, resource, action, ctx)) {
			return { ok: false, reason: 'ABAC_DENY' };
		}

		return { ok: true };
	}

	/** Helper: lança erro padrão */
	public assertCan(args: Parameters<AccessControl['can']>[0]) {
		const res = this.can(args);
		if (!res.ok) {
			const err = new Error(res.reason);
			(err as any).statusCode = 403;
			throw err;
		}
	}
}
