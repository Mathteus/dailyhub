/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { validateEnv } from '@/config/env';
import { PrismaClient } from '@prisma/client';

const env = validateEnv();
const connectionString = `${env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const prisma = new PrismaClient({ adapter });

export { prisma };
