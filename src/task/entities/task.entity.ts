import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'inprogress',
  Cancel = 'cancel',
  Complete = 'complete',
  ReSchedule = 'reschedule',
  Assign = 'assign',
  ReOpen = 'reopen',
  OnHold = 'onhold',
  Resume = 'resume',
}

@Schema({ timestamps: true, versionKey: false, id: true })
export class ReplyAnswer {
  @Prop({ type: Types.ObjectId })
  personId: Types.ObjectId;

  @Prop({ type: String })
  answer: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Task {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(TaskStatus),
    default: TaskStatus.Pending,
  })
  status: TaskStatus;

  @Prop({ type: [String] })
  attachement: string[];

  @Prop({ type: [ReplyAnswer] })
  replayanswer: ReplyAnswer[];

  @Prop()
  isteam: boolean;

  @Prop({ type: Date })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
