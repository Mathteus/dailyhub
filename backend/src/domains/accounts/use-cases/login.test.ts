import { AccountsInMemory } from '@/database/accounts.inmemory';
import { expect, describe, it } from 'vitest';
import { AccountEntity } from '../dtos/account.entity';
import { Email } from '@/commom/email';
import { LoginAccount } from './login';
import { RegisterAccount } from './register';

describe('Login case', () => {
	it('should be possible to login with an account.', async () => {
		const database = new AccountsInMemory();
		const account = new AccountEntity({
			name: 'test',
			email: new Email('test@example.com'),
			password: '123456',
		});

		const register = new RegisterAccount(database);
		await register.execute(account);

		const login = new LoginAccount(database);
		const loginResult = await login.execute(account);
		expect(loginResult.email).toBe(account.email);
	});
});
