import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver';
import { AccountsRepository } from '@/database/accounts.repository';
import { AccountsPrisma } from '@/database/accounts.prisma';
import { AccountService } from './account.service';

@Module({
	providers: [
		AccountResolver,
		{
			provide: AccountsRepository,
			useClass: AccountsPrisma,
		},
		AccountService,
	],
	exports: [AccountResolver, AccountsRepository, AccountService],
})
export class AccountModule {}
