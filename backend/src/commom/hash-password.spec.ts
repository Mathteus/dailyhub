import { describe, expect, it } from 'vitest';
import { HashPassword, InvalidPassword } from "./hash-passoword";

describe('Hash Password', () => {
	it('should be able to create a hash password', async () => {
    const password = new HashPassword('12345678910');
    const hashPassword = await password.toHashPassword();
    expect(hashPassword).toBeDefined();
    expect(await password.confirmPassword(hashPassword)).toBe(true);
	});

	it('should throw an error if password is invalid.', async () => {
		expect(async () => {
    const password = new HashPassword('12345678910');
    const hashPassword = await password.toHashPassword();
      await password.confirmPassword(hashPassword);
		}).toThrow(InvalidPassword);
	});
});
