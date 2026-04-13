import { DEFAULT_PASSWORD_CONFIG } from '@/commom/constants';
import { Email, InvalidFormatEmail } from '@/commom/email';
import { toHashPassword } from '@/commom/hash-passoword';
import {
	Password,
	PasswordLenghtLessThanMin,
	PasswordSpecialLessThanMin,
	PasswordNumberLessThanMin,
	PasswordUpperLessThanMin,
} from '@/commom/password';
import { compareTypes } from '@/commom/utils';
import { AccountsRepository } from '@/database/accounts.repository';
import {
	ConflictException,
	UnprocessableEntityException,
	BadRequestException,
	InternalServerErrorException,
	Injectable,
} from '@nestjs/common';
import { AccountEntity } from '../dtos/account.entity';

export interface IRegisterAccount {
	name: string;
	email: string;
	password: string;
}

@Injectable()
export class RegisterAccount {
	constructor(private readonly database: AccountsRepository) {}

	async execute(data: IRegisterAccount) {
		try {
			const email = new Email(data.email);
			const password = new Password({
				value: data.password,
				config: DEFAULT_PASSWORD_CONFIG,
			});

			const checkIfAlreadyExists =
				await this.database.checkIfAccountExistsByEmail(email.value);
			if (checkIfAlreadyExists) {
				throw new ConflictException('Email already exists!');
			}

			const hashedPassword = await toHashPassword(password.value);
			await this.database.create({
				email: email.value,
				password: hashedPassword,
				name: data.name,
			});

			return new AccountEntity({
				name: data.name,
				email,
				password: hashedPassword,
			});
		} catch (err) {
			if (
				compareTypes(err, [
					InvalidFormatEmail,
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
}
