import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
	AccountObject,
	CreateAccountInput,
	LoginAccountInput,
} from './account.gql-types';
import { Injectable } from '@nestjs/common';
import { RegisterAccount } from '@/domains/accounts/use-cases/register';
import { LoginAccount } from '@/domains/accounts/use-cases/login';

@Resolver()
@Injectable()
export class AccountResolver {
	constructor(
		private readonly loginAccount: LoginAccount,
		private readonly registerAccount: RegisterAccount,
	) {}

	@Query(() => AccountObject)
	async login(
		@Args('account') account: LoginAccountInput,
	): Promise<AccountObject> {
		const accountEntity = await this.loginAccount.execute({
			email: account.email,
			password: account.password,
		});
		return {
			id: accountEntity.id,
			name: accountEntity.name,
			email: accountEntity.email,
			createdAt: accountEntity.createdAt,
			updatedAt: accountEntity.updatedAt,
		};
	}

	@Mutation(() => AccountObject)
	async register(
		@Args('account') account: CreateAccountInput,
	): Promise<AccountObject> {
		const accountEntity = await this.registerAccount.execute({
			name: account.name,
			email: account.email,
			password: account.password,
		});
		return {
			id: accountEntity.id,
			name: accountEntity.name,
			email: accountEntity.email,
			createdAt: accountEntity.createdAt,
			updatedAt: accountEntity.updatedAt,
		};
	}
}
