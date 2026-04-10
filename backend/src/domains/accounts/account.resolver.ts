import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
	AccountObject,
	CreateAccountInput,
	LoginAccountInput,
} from './account.gql-types';
import { Injectable } from '@nestjs/common';
import { AccountService } from './account.service';

@Resolver()
@Injectable()
export class AccountResolver {
	constructor(private readonly service: AccountService) {}

	@Query(() => AccountObject)
	async loginAccount(
		@Args('data') data: LoginAccountInput,
	): Promise<AccountObject> {
		const accountEntity = await this.service.LoginAccount({
			email: data.email,
			password: data.password,
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
	async createAccount(
		@Args('account') account: CreateAccountInput,
	): Promise<AccountObject> {
		const accountEntity = await this.service.CreateAccount(account);
		return {
			id: accountEntity.id,
			name: accountEntity.name,
			email: accountEntity.email,
			createdAt: accountEntity.createdAt,
			updatedAt: accountEntity.updatedAt,
		};
	}
}
