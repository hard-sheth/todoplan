import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PlansModule } from './plans/plans.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingInterceptor } from './utils/commonRequestLog';
import { HttpCronlogModule } from './utils/http-cronlog/http-cronlog.module';
import { HttpCronlogService } from './utils/http-cronlog/http-cronlog.service';
import {
  HttpLog,
  HttpLogSchema,
} from './utils/http-cronlog/entities/httplog.entity';
import { JwtModule } from '@nestjs/jwt';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TodoModule,
    PlansModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL, { retryAttempts: 3 }),
    MongooseModule.forFeature([{ name: HttpLog.name, schema: HttpLogSchema }]),
    TaskModule,
    HttpCronlogModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_SECRETKEY'),
      }),
    }),
    CacheModule.register({
      ttl:18000,
      max: 30,
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HttpCronlogService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  // implements NestModule
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  // }
}
