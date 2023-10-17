import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as multer from 'multer';

import { VersioningType } from '@nestjs/common';
//upload file
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });
  //upload file
  const upload = multer({ dest: 'uploads/' });
  app.use(upload.any());
  await app.listen(3000);
}
bootstrap();
