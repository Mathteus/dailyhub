import { Email } from '@/commom/email';
import { nanoid } from 'nanoid';

export interface IAccountEntity {
	id: string;
	name: string;
	email: Email;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAccountEntityCreate {
	id?: string;
	name: string;
	email: Email;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class AccountEntity {
	private data: IAccountEntity;

	constructor(accountToInitialize: IAccountEntityCreate) {
		const preparedAccount = accountToInitialize;
		preparedAccount['id'] = accountToInitialize.id || '';
		preparedAccount['createdAt'] = accountToInitialize.createdAt || new Date();
		preparedAccount['updatedAt'] = accountToInitialize.updatedAt || new Date();
		this.data = {
			id: preparedAccount.id,
			email: preparedAccount.email,
			name: preparedAccount.name,
			password: preparedAccount.password,
			createdAt: preparedAccount.createdAt,
			updatedAt: preparedAccount.updatedAt,
		};
	}

	get id(): string {
		return this.data.id;
	}

	get email(): string {
		return this.data.email.value;
	}

	get password(): string {
		return this.data.password;
	}

	get name(): string {
		return this.data.name;
	}

	get createdAt(): Date {
		return this.data.createdAt;
	}

	get updatedAt(): Date {
		return this.data.updatedAt;
	}
}
