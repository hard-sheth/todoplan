import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends CreateTaskDto {
  @ApiProperty({
    description: 'Update Status',
    example: TaskStatus.Pending,
    required: false,
    name: 'status',
    enum: TaskStatus,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class PatchTaskDto {
  @ApiProperty({
    description: 'Update Status',
    example: TaskStatus.Pending,
    required: false,
    name: 'status',
    enum: TaskStatus,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class AnswerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Answer particular task.',
    required: false,
    name: 'answer',
  })
  answer: string;
}
