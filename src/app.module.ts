import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PlansModule } from './plans/plans.module';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    TodoModule,
    PlansModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
      cache: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL, { retryAttempts: 3 }),
    MongooseModule.forFeature([{ name: HttpLog.name, schema: HttpLogSchema }]),
    TaskModule,
    HttpCronlogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HttpCronlogService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
})
export class AppModule {
  // implements NestModule
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  // }
}
