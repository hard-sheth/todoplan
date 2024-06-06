import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Some random title',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Some random description',
  })
  description: string;
}
