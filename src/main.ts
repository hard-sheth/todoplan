import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Student Parents microservices')
    .setDescription('Student Parents related APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        in: 'header',
        name: 'jwt',
        description: 'JWT token validation',
      },
      'bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api/doc', app, document);
  await app.listen(4000);
}
bootstrap();
