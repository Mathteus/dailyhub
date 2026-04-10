import { envSchema, EnvSchema } from './env.schema';

export function validateEnv(): EnvSchema {
	const parsed = envSchema.safeParse(process.env);

	if (!parsed.success) {
		console.error('❌ Invalid environment variables:');
		console.error(parsed.error.format());
		process.exit(1);
	}

	return parsed.data;
}
