import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import setupSwagger from './swagger/swagger';
import { addAliases } from 'module-alias';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from 'guards/roles.guard';
import mongoose from 'mongoose';

if (process.env.NODE_ENV === 'production') {
  addAliases({
    '@services': __dirname + '/services',
    '@interceptors': __dirname + '/interceptors',
    '@modules': __dirname + '/modules',
  });
}

async function bootstrap() {
  try {
    const adapter = new FastifyAdapter({ bodyLimit: 10 * 1024 * 1024 });
    adapter.enableCors({ origin: '*' });
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      adapter,
    );

    const reflector = new Reflector();
    app.useGlobalGuards(new JwtAuthGuard(reflector));
    app.useGlobalGuards(new RolesGuard(reflector));
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    mongoose.set('debug', true);

    setupSwagger(app, adapter.getInstance());

    await app.listen(Number(process.env.PORT), process.env.HOST, () => {
      console.log(
        `Server is running on http://${process.env.HOST}:${process.env.PORT}`,
      );
    });
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
