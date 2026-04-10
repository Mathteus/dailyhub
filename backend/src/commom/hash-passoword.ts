import { validateEnv } from '@/config/env';

export async function toHashPassword(password: string): Promise<string> {
	const env = validateEnv();
	const newPasswordSecurity = `${env.PEPPER}${password}`;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	const argonHash = await Bun.password.hash(newPasswordSecurity, {
		algorithm: 'argon2id',
		memoryCost: 4,
		timeCost: 3,
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return argonHash;
}

export async function comparePassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	const env = validateEnv();
	const newPasswordSecurity = `${env.PEPPER}${password}`;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	return await Bun.password.verify(newPasswordSecurity, hashedPassword);
}
