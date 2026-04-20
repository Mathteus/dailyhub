import {
	AccountNotFound,
	AccountsRepository,
	IAccountResponse,
	ICreateAccounRepository,
} from './accounts.repository';
import { prisma } from './prisma.config';

export class AccountsPrisma implements AccountsRepository {
	public async create(account: ICreateAccounRepository): Promise<void> {
		await prisma.accounts.create({
			data: {
				email: account.email,
				password: account.password,
				name: account.name,
			},
		});
	}

	public async searchByEmail(email: string): Promise<IAccountResponse> {
		const account = await prisma.accounts.findUnique({
			where: {
				email,
			},
		});

		if (!account) {
			throw new AccountNotFound();
		}

		return {
			name: account.name,
			email: account.email,
			id: account.id,
			createdAt: account.createdAt,
			updatedAt: account.updatedAt,
			password: account.password,
		};
	}

	public async searchById(id: string): Promise<IAccountResponse> {
		const account = await prisma.accounts.findUnique({
			where: {
				id,
			},
		});

		if (!account) {
			throw new AccountNotFound();
		}

		return {
			name: account.name,
			email: account.email,
			id: account.id,
			createdAt: account.createdAt,
			updatedAt: account.updatedAt,
			password: account.password,
		};
	}

	public async deleteById(id: string): Promise<void> {
		await prisma.accounts.delete({
			where: {
				id,
			},
		});
	}

	public async getPasswordById(accountId: string): Promise<string> {
		const account = await prisma.accounts.findUnique({
			where: {
				id: accountId,
			},
		});

		if (!account) {
			throw new AccountNotFound();
		}

		return account.password;
	}

		public async getPasswordByEmail(accountEmail: string): Promise<string> {
		const account = await prisma.accounts.findUnique({
			where: {
				email: accountEmail,
			},
		});

		if (!account) {
			throw new AccountNotFound();
		}

		return account.password;
	}

	public async checkIfAccountExistsByEmail(email: string): Promise<void> {
		const account = await prisma.accounts.findUnique({
			where: {
				email,
			},
		});

		 if (account !== null) {
			throw new AccountNotFound();
		 }
	}
}
