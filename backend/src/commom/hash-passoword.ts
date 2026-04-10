import { validateEnv } from '@/config/env';

import argon2 from 'argon2';

export async function toHashPassword(password: string): Promise<string> {
	const env = validateEnv();
	const newPasswordSecurity = `${env.PEPPER}${password}`;
	const options = {
		type: argon2.argon2id, // Recommended variant
		memoryCost: 2 ** 16, // 64 MB
		timeCost: 3, // 3 iterations
		parallelism: 4, // 4 threads
	};
	return await argon2.hash(newPasswordSecurity, options);
}

export async function comparePassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	const env = validateEnv();
	const newPasswordSecurity = `${env.PEPPER}${password}`;
	return await argon2.verify(hashedPassword, newPasswordSecurity);
}
