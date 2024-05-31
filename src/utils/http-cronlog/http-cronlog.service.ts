import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpLog, HttpLogDocument } from './entities/httplog.entity';
import { Model } from 'mongoose';

@Injectable()
export class HttpCronlogService {
  constructor(
    @InjectModel(HttpLog.name) private HttpLogModel: Model<HttpLogDocument>,
  ) {}
  async httpError(
    url: string,
    method: string,
    querySearch: object,
    body: object,
    ip: string,
    errorMessage: string,
    differenceTime: number,
  ) {
    try {
      const createHttpLog = new this.HttpLogModel({
        url,
        querySearch,
        body,
        ip,
        method,
        errorMessage,
        differenceTime,
      });
      const logdata = await createHttpLog.save();
      return logdata;
    } catch (error) {
      Logger.warn(error);
    }
  }

  async httpSuccess(
    url: string,
    method: string,
    querySearch: object,
    body: object,
    ip: string,
    differenceTime: number,
  ) {
    try {
      const createHttpLog = new this.HttpLogModel({
        url,
        querySearch,
        body,
        method,
        ip,
        differenceTime,
      });
      const logdata = await createHttpLog.save();
      return logdata;
    } catch (error) {
      Logger.warn(error);
    }
  }
}
