import { Email } from '@/commom/email';
import { AccountsRepository } from '@/database/accounts.repository';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { AccountEntity } from '../dtos/account.entity';
import { HashPassword } from '@/commom/hash-passoword';

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
			const password_checker = new HashPassword(password);
			await password_checker.confirmPassword(account.password);
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
