import { expect, describe, test } from 'bun:test';
import { AccountEntity } from './account.entity';
import { Password, PasswordSpecialLessThanMin } from '@/commom/password';
import { Email, InvalidEmail } from '@/commom/email';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
describe('AccountEntity', () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	test('it should create a new account entity', () => {
		const account = new AccountEntity({
			name: 'test',
			email: new Email('test@example.com'),
			password: '12342121@56',
		});
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		expect(account).toBeTruthy();
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	test('it should throw error when password is invalid', () => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		expect(() => {
			const password = new Password({
				password: '1234212156',
				config: {
					minLength: 6,
					maxLength: 20,
					needSpecial: true,
					minSpecial: 1,
				},
			});

			new AccountEntity({
				name: 'test',
				email: new Email('test@example.com'),
				password: password.value,
			});
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		}).toThrow(PasswordSpecialLessThanMin);
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	test('it should throw error when email is invalid', () => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		expect(() => {
			new AccountEntity({
				name: 'test',
				email: new Email('test@com'),
				password: '12342121@56',
			});
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		}).toThrow(InvalidEmail);
	});
});
