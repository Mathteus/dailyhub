import { AccountEntity } from '@/domains/accounts/dtos/account.entity';
import { delay } from '@/commom/utils';
import {
	AccountsRepository,
	ICreateAccounRepository,
	IAccountResponse,
} from './accounts.repository';
import { Email } from '@/commom/email';

export class AccountsInMemory implements AccountsRepository {
	private accounts: AccountEntity[] = [];

	async create(account: ICreateAccounRepository): Promise<void> {
		const email = new Email(account.email);
		const accountEntity = new AccountEntity({
			name: account.name,
			email,
			password: account.password,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		this.accounts.push(accountEntity);
		await delay(200);
	}

	async deleteById(id: string): Promise<void> {
		const account = this.accounts.find((account) => account.id === id);
		if (!account) {
			throw new Error('Account not found');
		}
		this.accounts = this.accounts.filter((account) => account.id !== id);
		await delay(200);
	}

	async searchByEmail(email: string): Promise<IAccountResponse> {
		const account = this.accounts.find((account) => account.email === email);
		if (!account) {
			throw new Error('Account not found');
		}
		await delay(200);
		return {
			id: account.id,
			name: account.name,
			email: account.email,
			createdAt: account.createdAt,
			updatedAt: account.updatedAt,
		};
	}

	async searchById(id: string): Promise<IAccountResponse> {
		const account = this.accounts.find((account) => account.id === id);
		if (!account) {
			throw new Error('Account not found');
		}
		await delay(200);
		return {
			id: account.id,
			name: account.name,
			email: account.email,
			createdAt: account.createdAt,
			updatedAt: account.updatedAt,
		};
	}

	async getPasswordById(accountId: string): Promise<string> {
		const account = this.accounts.find((account) => account.id === accountId);
		if (!account) {
			throw new Error('Account not found');
		}
		await delay(200);
		return account.password;
	}

	async checkIfAccountExistsByEmail(email: string): Promise<boolean> {
		await delay(200);
		return this.accounts.some((account) => account.email === email);
	}
}
