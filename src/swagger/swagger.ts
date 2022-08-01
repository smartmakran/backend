import { NestFastifyApplication } from '@nestjs/platform-fastify';
import Cookies = require('cookies');
import { FastifyInstance } from 'fastify';
import { join } from 'path';
import * as jwt from 'jsonwebtoken';
import { createReadStream } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from '@modules/auth/auth.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';

const SWAGGER_ENDPOINT = 'swagger';
const SWAGGER_LOGIN_ENDPOINT = 'swagger_login';
const SWAGGER_COOKIE_NAME = 'ms::api-front-doc';
const SWAGGER_LOGIN_HTML_PATH = join(
  __dirname,
  '../..',
  'views',
  `${SWAGGER_LOGIN_ENDPOINT}.html`,
);

export default function setupSwagger(
  app: NestFastifyApplication,
  server: FastifyInstance,
) {
  server.after(() => {
    server.addHook('onRoute', (opts) => {
      const url = opts.url;
      if (
        url !== `/${SWAGGER_LOGIN_ENDPOINT}` &&
        url.indexOf(`/${SWAGGER_ENDPOINT}`) === 0
      ) {
        opts.onRequest = (request: any, reply: any, next) => {
          const user = process.env.SWAGGER_LOGIN_USERNAME as string;

          const cookies = new Cookies(request.raw, reply.raw, {
            keys: [user],
          });
          const cookie = cookies.get(SWAGGER_COOKIE_NAME, {
            signed: true,
          });
          if (cookie) {
            try {
              jwt.verify(cookie, user);
              next();
              return;
            } catch (error) {
              console.error(error);
            }
          }

          reply.redirect(`/${SWAGGER_LOGIN_ENDPOINT}`);
        };
      }
    });

    // login routes
    server.route({
      method: 'GET',
      url: `/${SWAGGER_LOGIN_ENDPOINT}`,
      handler: (_request, reply) => {
        const stream = createReadStream(SWAGGER_LOGIN_HTML_PATH);
        reply.type('text/html').send(stream);
      },
    });

    // login request
    server.route({
      method: 'POST',
      url: `/${SWAGGER_LOGIN_ENDPOINT}`,
      handler: (request: any, reply) => {
        const user = process.env.SWAGGER_LOGIN_USERNAME as string;
        const pass = process.env.SWAGGER_LOGIN_PASSWORD as string;

        const you_know: string = request.body.you_know;
        if (you_know !== pass) {
          reply.redirect(`/${SWAGGER_LOGIN_ENDPOINT}`);
          return;
        }

        const token = jwt.sign({ id: new Date().getTime() }, user);
        const cookies = new Cookies(request.raw, reply.raw, { keys: [user] });
        cookies.set(SWAGGER_COOKIE_NAME, token, { signed: true });
        reply.redirect(`/${SWAGGER_ENDPOINT}`);
      },
    });
  });

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
    include: [AuthModule, DashboardModule],
  });
  SwaggerModule.setup(SWAGGER_ENDPOINT, app, document, {
    customCss: `.opblock-summary-description{direction: rtl; margin-right: 10px;}`,
  });
}
