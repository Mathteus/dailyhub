import { z } from 'zod';

export const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	PORT: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val), {
			message: 'PORT must be a number',
		})
		.describe('Port number'),
	DATABASE_URL: z.url().optional().describe('Database URL'),
	JWT_SECRET: z.string().min(10).describe('JWT secret').optional(),
	REDIS_URL: z.url().describe('Redis URL').optional(),
	PEPPER: z.string().describe('Pepper'),
});

export type EnvSchema = z.infer<typeof envSchema>;
