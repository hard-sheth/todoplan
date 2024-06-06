import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

export enum TodoStatus {
  Pending = 'pending',
  InProgress = 'inprogress',
  Cancel = 'cancel',
  Complete = 'complete',
  ReSchedule = 'reschedule',
}

@Schema({ timestamps: true, versionKey: false })
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    required: true,
    // enum: [TodoStatus],
    enum: Object.values(TodoStatus),
    default: TodoStatus.Pending,
  })
  status: TodoStatus;

  // @Prop({ type: Date })
  // // , expires: 10
  // createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

/**
 * 
 * 
import { Owner } from '../owners/schemas/owner.schema';

// inside the class definition
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
owner: Owner;   

@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
owner: Owner[];




export interface Event {
  pending: 'Pending',
}


 */
