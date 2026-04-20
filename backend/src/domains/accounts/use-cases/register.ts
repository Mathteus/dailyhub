import { DEFAULT_PASSWORD_CONFIG } from '@/commom/constants';
import { Email, InvalidFormatEmail } from '@/commom/email';
import {
	Password,
	PasswordLenghtLessThanMin,
	PasswordSpecialLessThanMin,
	PasswordNumberLessThanMin,
	PasswordUpperLessThanMin,
} from '@/commom/password';
import { compareTypes } from '@/commom/utils';
import { AccountNotFound, AccountsRepository } from '@/database/accounts.repository';
import {
	ConflictException,
	UnprocessableEntityException,
	BadRequestException,
	InternalServerErrorException,
	Injectable,
} from '@nestjs/common';
import { AccountEntity } from '../dtos/account.entity';
import { HashPassword } from '@/commom/hash-passoword';

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

			await this.database.checkIfAccountExistsByEmail(email.value);

			const passwordChecker = new HashPassword(password.value);
			const hashedPassword = await passwordChecker.toHashPassword();

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
				throw new UnprocessableEntityException(err.message);
			}

			if (err instanceof Error) {
				throw new BadRequestException(err.message);
			}

			if (err instanceof AccountNotFound) {
				throw new ConflictException(err.message);
			}

			throw new InternalServerErrorException(JSON.stringify(err));
		}
	}
}
