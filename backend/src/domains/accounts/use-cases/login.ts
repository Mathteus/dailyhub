import { Email } from '@/commom/email';
import { comparePassword } from '@/commom/hash-passoword';
import { AccountsRepository } from '@/database/accounts.repository';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { AccountEntity } from '../dtos/account.entity';

export interface ILoginAccount {
	email: string;
	password: string;
}

@Injectable()
export class LoginAccount {
	constructor(private readonly database: AccountsRepository) {}

	public async execute({
		email,
		password,
	}: ILoginAccount): Promise<AccountEntity> {
		try {
			const emailAccount = new Email(email);
			const account = await this.database.searchByEmail(emailAccount.value);
			if (!account) {
				throw new BadRequestException('Email not found!');
			}

			const password_account = await this.database.getPasswordById(account.id);
			const isPasswordValid = await comparePassword(password, password_account);
			if (!isPasswordValid) {
				throw new BadRequestException('Password is invalid!');
			}

			return new AccountEntity({
				id: account.id,
				name: account.name,
				email: emailAccount,
				password: '',
			});
		} catch (err) {
			if (err instanceof Error) {
				throw new BadRequestException(err.message);
			}

			throw new InternalServerErrorException(JSON.stringify(err));
		}
	}
}
