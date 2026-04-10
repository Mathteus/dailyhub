import { z } from 'zod';

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

export const CrudMaskSchema = z.number().int().min(0).max(15);

export const ResourceSchema = z.string().min(1).max(64); // ex: "users", "orders"
export type Resource = z.infer<typeof ResourceSchema>;

/** ACL por recurso: { "users": 7, "orders": 15 } */
export const AclSchema = z.record(ResourceSchema, CrudMaskSchema);
export type Acl = z.infer<typeof AclSchema>;

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
