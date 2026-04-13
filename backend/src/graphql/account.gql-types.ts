import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountObject {
	@Field()
	id: string;
	@Field()
	name: string;
	@Field()
	email: string;
	@Field()
	createdAt: Date;
	@Field()
	updatedAt: Date;
}

@InputType()
export class CreateAccountInput {
	@Field()
	name: string;
	@Field()
	email: string;
	@Field()
	password: string;
}

@InputType()
export class LoginAccountInput {
	@Field()
	email: string;
	@Field()
	password: string;
}
