import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { config } from 'dotenv';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import setupSwagger from './swagger/swagger';

if (process.env.NODE_ENV === 'production') {
  config({
    path: join(__dirname, '../configs/production.env'),
  });
} else {
  config({
    path: join(__dirname, '../configs/development.env'),
  });
}

async function bootstrap() {
  const adapter = new FastifyAdapter({ bodyLimit: 10 * 1024 * 1024 });
  adapter.enableCors({ origin: '*' });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  app.setGlobalPrefix('api');

  setupSwagger(app, adapter.getInstance());

  await app.listen(Number(process.env.PORT), process.env.HOST, () => {
    console.log(
      `Server is running on http://${process.env.HOST}:${process.env.PORT}`,
    );
  });
}
bootstrap();
