import { validateEnv } from '@/config/env';
import argon2 from 'argon2';

export class InvalidPassword extends Error {
	constructor() {
		super("Invalid password!");
	}
}

export class HashPassword {
	private _password: string;
	
	constructor(password: string) {
		this._password = password;
	}

	async toHashPassword(): Promise<string> {
		const env = validateEnv();
		const newPasswordSecurity = `${env.PEPPER}${this._password}`;
		const options = {
			type: argon2.argon2id, // Recommended variant
			memoryCost: 2 ** 16, // 64 MB
			timeCost: 3, // 3 iterations
			parallelism: 4, // 4 threads
		};
		return await argon2.hash(newPasswordSecurity, options);
	}

	async confirmPassword(hashedPassword: string): Promise<void> {
		const env = validateEnv();
		const newPasswordSecurity = `${env.PEPPER}${this._password}`;
		const isValid = await argon2.verify(hashedPassword, newPasswordSecurity);
		if (!isValid) {
			throw new InvalidPassword();
		}
	}
}
