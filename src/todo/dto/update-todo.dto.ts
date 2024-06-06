import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { TodoStatus } from '../entities/todo.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsEnum(TodoStatus)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Update Status',
    example: TodoStatus.Pending,
    required: false,
    name: 'status',
    enum: TodoStatus,
  })
  status: TodoStatus;
}
