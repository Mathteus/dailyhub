import { Email } from '@/commom/email';
import { AccountsInMemory } from '@/database/accounts.inmemory';
import { describe, it } from 'node:test';
import { AccountEntity } from '../dtos/account.entity';
import { RegisterAccount } from './register';
import { expect } from 'vitest';

describe('Register Case', () => {
	it('should be possible to register an account.', async () => {
		const database = new AccountsInMemory();
		const account = new AccountEntity({
			name: 'test',
			email: new Email('test@example.com'),
			password: '123456',
		});

		const register = new RegisterAccount(database);
		await register.execute(account);
		const checkIfAlreadyExists = await database.checkIfAccountExistsByEmail(
			account.email,
		);

		expect(checkIfAlreadyExists).toBe(true);
	});
});
