import { Email } from '@/commom/email';
import { Identifier } from '@/commom/indentifier';
import { Password } from '@/commom/password';

export interface IAccountEntity {
	id: Identifier;
	email: Email;
	password: Password;
	createdAt: Date;
	updatedAt: Date;
}

export class AccountEntity {
	private props: IAccountEntity;

	constructor(
		accountToInitialize: Partial<
			Pick<IAccountEntity, 'id' | 'createdAt' | 'updatedAt'>
		>,
	) {
		const preparedAccount = accountToInitialize;
		preparedAccount['id'] = accountToInitialize.id || new Identifier();
		preparedAccount['createdAt'] = accountToInitialize.createdAt || new Date();
		preparedAccount['updatedAt'] = accountToInitialize.updatedAt || new Date();
		this.props = preparedAccount as IAccountEntity;
	}

	get id(): Identifier {
		return this.props.id;
	}

	get email(): Email {
		return this.props.email;
	}

	get password(): Password {
		return this.props.password;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date {
		return this.props.updatedAt;
	}
}
