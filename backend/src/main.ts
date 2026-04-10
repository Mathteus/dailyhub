import { validateEnv } from './config/env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const env = validateEnv();
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(env.PORT);

	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
