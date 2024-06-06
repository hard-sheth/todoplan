import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlanDocument = HydratedDocument<Plan>;

export enum PlanStatus {
  Pending = 'pending',
  InProgress = 'inprogress',
  Cancel = 'cancel',
  Complete = 'complete',
}

@Schema({ timestamps: true, versionKey: false })
export class Plan {
  @Prop()
  plan: string;

  @Prop({
    type: String,
    required: true,
    // enum: [PlanStatus],
    enum: Object.values(PlanStatus),
    default: PlanStatus.Pending,
  })
  status: PlanStatus;

  @Prop({ type: Date, expires: 10 })
  createdAt: Date;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
