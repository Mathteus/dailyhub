import { Module } from '@nestjs/common';
import { AccountsRepository } from '@/database/accounts.repository';
import { AccountsPrisma } from '@/database/accounts.prisma';
import { AccountResolver } from '@/graphql/account.resolver';
import { RegisterAccount } from './use-cases/register';

@Module({
	providers: [
		AccountResolver,
		{
			provide: AccountsRepository,
			useClass: AccountsPrisma,
		},
		RegisterAccount,
	],
	exports: [AccountResolver, AccountsRepository, RegisterAccount],
})
export class AccountModule {}
