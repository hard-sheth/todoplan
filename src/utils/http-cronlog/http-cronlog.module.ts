import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpLog, HttpLogSchema } from './entities/httplog.entity';
import { HttpCronlogService } from './http-cronlog.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HttpLog.name, schema: HttpLogSchema }]),
  ],
  providers: [HttpCronlogService],
})
export class HttpCronlogModule {}
