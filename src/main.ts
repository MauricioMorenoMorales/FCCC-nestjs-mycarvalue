import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// Permite usar Dtos para validar la informacion en los requests
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // Elimina propiedades no especificadas en los dtos
		}),
	);
	await app.listen(3000);
}
bootstrap();
