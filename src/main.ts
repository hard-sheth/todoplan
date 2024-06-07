import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn','log'],
  });
    app.enableCors({
      credentials: true,
      origin:['http://localhost:3000']
    });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const options = new DocumentBuilder()
  // .addOAuth2()
    .setTitle('Test Service For Login')
    .setDescription('These is the testing backing application which we developed to learn something in nestjs.')
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
  await app.listen(process.env.PORT||4000);
}
bootstrap();
