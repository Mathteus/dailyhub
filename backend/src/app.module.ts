import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: (config) => {
				const parsed = envSchema.parse(config);
				return parsed;
			},
			validationOptions: {
				allowUnknown: false,
				abortEarly: true,
			},
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
			sortSchema: true,
		}),
	],
})
export class AppModule {}
