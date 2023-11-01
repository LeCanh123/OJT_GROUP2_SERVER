/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as multer from 'multer';

import * as session from 'express-session';
import * as passport from 'passport';

//upload file
import { json, urlencoded } from 'express';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  app.use(
    session({
      secret: 'my-secret',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  //upload file
  const upload = multer({ dest: 'uploads/' });
  app.use(upload.any());

  /* Validation */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
