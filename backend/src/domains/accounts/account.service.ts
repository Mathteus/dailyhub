import { DEFAULT_PASSWORD_CONFIG } from '@/commom/constants';
import { Email, InvalidEmail } from '@/commom/email';
import { comparePassword, toHashPassword } from '@/commom/hash-passoword';
import { Identifier } from '@/commom/indentifier';
import {
	Password,
	PasswordLenghtLessThanMin,
	PasswordNumberLessThanMin,
	PasswordSpecialLessThanMin,
	PasswordUpperLessThanMin,
} from '@/commom/password';
import { anyType } from '@/commom/utils';
import { AccountsRepository } from '@/database/accounts.repository';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { AccountEntity } from './account.entity';

export interface ICreateAccount {
	name: string;
	email: string;
	password: string;
}

export interface ILoginAccount {
	email: string;
	password: string;
}

@Injectable()
export class AccountService {
	constructor(private readonly database: AccountsRepository) {}

	public async CreateAccount(data: ICreateAccount) {
		try {
			const email = new Email(data.email);
			const password = new Password({
				password: data.password,
				config: DEFAULT_PASSWORD_CONFIG,
			});

			const checkIfAlreadyExists =
				await this.database.checkIfAccountExistsByEmail(email.value);
			if (checkIfAlreadyExists) {
				throw new ConflictException('Email already exists!');
			}

			const identifier = new Identifier();
			const hashedPassword = await toHashPassword(password.value);
			await this.database.create({
				email: email.value,
				password: hashedPassword,
				salt: '',
				identifier: identifier.value,
				name: data.name,
			});

			return new AccountEntity({
				id: identifier,
				name: '',
				email: email,
				password: hashedPassword,
			});
		} catch (err) {
			if (
				anyType(err, [
					InvalidEmail,
					PasswordLenghtLessThanMin,
					PasswordSpecialLessThanMin,
					PasswordNumberLessThanMin,
					PasswordUpperLessThanMin,
				])
			) {
				throw new UnprocessableEntityException();
			}

			if (err instanceof Error) {
				throw new BadRequestException(err.message);
			}

			if (err instanceof ConflictException) {
				throw err;
			}

			throw new InternalServerErrorException(JSON.stringify(err));
		}
	}

	public async LoginAccount(data: ILoginAccount) {
		try {
			const email = new Email(data.email);
			const password = data.password;

			const account = await this.database.searchByEmail(email.value);
			if (!account) {
				throw new BadRequestException('Email not found!');
			}

			const password_account = await this.database.getPasswordById(account.id);
			const isPasswordValid = await comparePassword(password, password_account);
			if (!isPasswordValid) {
				throw new BadRequestException('Password is invalid!');
			}

			return account;
		} catch (err) {
			if (err instanceof Error) {
				throw new BadRequestException(err.message);
			}

			throw new InternalServerErrorException(JSON.stringify(err));
		}
	}
}
