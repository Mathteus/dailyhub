export class AccountNotFound extends Error {
	constructor() {
		super('Account not found');
	}
}

export interface ICreateAccounRepository {
	name: string;
	email: string;
	password: string;
}

export interface IAccountResponse {
	name: string;
	email: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

export abstract class AccountsRepository {
	public abstract create(account: ICreateAccounRepository): Promise<void>;
	public abstract deleteById(id: string): Promise<void>;
	public abstract searchByEmail(email: string): Promise<IAccountResponse>;
	public abstract searchById(id: string): Promise<IAccountResponse>;
	public abstract getPasswordById(accountId: string): Promise<string>;
	public abstract checkIfAccountExistsByEmail(
		accountId: string,
	): Promise<boolean>;
}
