import { Email } from '@/commom/email';
import { Identifier } from '@/commom/indentifier';

export interface IAccountEntity {
	id: Identifier;
	name: string;
	email: Email;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAccountEntityCreate {
	id?: Identifier;
	name: string;
	email: Email;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class AccountEntity {
	private props: IAccountEntity;

	constructor(accountToInitialize: IAccountEntityCreate) {
		const preparedAccount = accountToInitialize;
		preparedAccount['id'] = accountToInitialize.id || new Identifier();
		preparedAccount['createdAt'] = accountToInitialize.createdAt || new Date();
		preparedAccount['updatedAt'] = accountToInitialize.updatedAt || new Date();
		this.props = {
			id: preparedAccount.id,
			email: preparedAccount.email,
			name: preparedAccount.name,
			password: preparedAccount.password,
			createdAt: preparedAccount.createdAt,
			updatedAt: preparedAccount.updatedAt,
		};
	}

	get id(): string {
		return this.props.id.value;
	}

	get email(): string {
		return this.props.email.value;
	}

	get password(): string {
		return this.props.password;
	}

	get name(): string {
		return this.props.name;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date {
		return this.props.updatedAt;
	}
}
