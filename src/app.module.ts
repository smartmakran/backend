import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        __dirname,
        '..',
        'configs',
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
