import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),MongooseModule.forRootAsync(
    {
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        uri: configService.get('DATABASE_URI'),
        useNewUrlParser: true,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    },
  ),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
