import Cookies = require('cookies');
import { join } from 'path';
import * as jwt from 'jsonwebtoken';
import { createReadStream } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from '@modules/auth/auth.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { FarmModule } from '@modules/farm/farm.module';
import { PondModule } from '@modules/pond/pond.module';
import { SensorModule } from '@modules/sensor/sensor.module';
import { UserModule } from '@modules/user/user.module';
import { TaskModule } from '@modules/task/task.module';
import { ManualMonitoringModule } from '@modules/manualMonitoring/manualMonitoring.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as basicAuth from 'express-basic-auth';

const SWAGGER_ENDPOINT = 'swagger';
const SWAGGER_LOGIN_ENDPOINT = 'swagger_login';
const SWAGGER_COOKIE_NAME = 'ms::api-front-doc';
const SWAGGER_LOGIN_HTML_PATH = join(
  __dirname,
  '../..',
  'views',
  `${SWAGGER_LOGIN_ENDPOINT}.html`,
);

export default function setupSwagger(app: NestExpressApplication) {
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_LOGIN_USERNAME]:
          process.env.SWAGGER_LOGIN_PASSWORD,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Smart Makran Api')
    .setDescription('Smart Makran Api')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'jwt Token after login',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [
      AuthModule,
      UserModule,
      DashboardModule,
      FarmModule,
      PondModule,
      SensorModule,
      TaskModule,
      ManualMonitoringModule,
    ],
  });
  SwaggerModule.setup(SWAGGER_ENDPOINT, app, document, {
    customCss: `.opblock-summary-description{direction: rtl; margin-right: 10px;}`,
  });
}
