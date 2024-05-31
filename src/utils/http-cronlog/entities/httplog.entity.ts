import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type HttpLogDocument = HydratedDocument<HttpLog>;

@Schema({ timestamps: true, versionKey: false })
export class HttpLog {
  @Prop()
  url: string;

  @Prop()
  method: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  querySearch: any;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  body: any;

  @Prop()
  ip: string;

  @Prop()
  errorMessage: string;

  @Prop({ type: Types.Decimal128 })
  differenceTime: number;
}

export const HttpLogSchema = SchemaFactory.createForClass(HttpLog);
