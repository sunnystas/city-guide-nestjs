import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Config */
  const configService = app.get(ConfigService);

  /* Swagger */
  const swaggerOptions = new DocumentBuilder()
    .setTitle('API reference')
    .setDescription(
      `API reference for the ${configService.get('APP_NAME')} Application`,
    )
    .setVersion(configService.get('APP_VERSION'))
    .addTag(configService.get('APP_NAME'))
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/', app, swaggerDocument);

  /* Validation */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(
    configService.get('PORT') || 3000,
    (configService.get('HOST') as string) || '0.0.0.0',
  );
}
bootstrap();
