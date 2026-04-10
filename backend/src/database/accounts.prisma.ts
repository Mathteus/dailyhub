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
				salt: account.salt,
				id: account.identifier,
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
			email: account.email,
			id: account.id,
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
			email: account.email,
			id: account.id,
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
}
