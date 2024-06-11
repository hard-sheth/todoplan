import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Todo, TodoSchema } from "./entities/todo.entity";
import { CookieSession } from "src/utils/cookiesession.middleware";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_SECRETKEY'),
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: 60000,
          limit: 5,
          name: 'shorttime',
        },
      ],
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieSession)
      // .forRoutes({ path: "todo", method: RequestMethod.GET });
  }
}
