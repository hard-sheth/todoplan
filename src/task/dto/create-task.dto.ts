import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  // IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  // Validate,
} from 'class-validator';
// import { IsNotEmptyString, NotEmptyOrZero } from 'src/utils/validation';

export enum Sorttype {
  Asc = 'asc',
  Desc = 'desc',
}
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Please Enter Title',
    example: 'Please Give Title',
    required: true,
    name: 'title',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Task description?',
    example: 'Please Give Description',
    required: true,
    name: 'description',
  })
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Is these team task or not?',
    example: true,
    required: true,
    name: 'isteam',
  })
  isteam: boolean;
}

export class Pagination {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'No of record want to skip.',
    example: 0,
    required: false,
    name: 'skip',
    // type: Number,
  })
  skip?: number;

  @IsOptional()
  // @IsNumberString()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Per page no',
    example: 5,
    required: false,
    name: 'record',
    type: Number,
  })
  record?: number;

  @IsOptional()
  // @IsNotEmptyString()
  @IsNumber()
  @Type(() => Number)
  // @Validate(NotEmptyOrZero)
  @ApiProperty({
    description: 'Give page no',
    example: 0,
    required: false,
    name: 'page',
    type: Number,
  })
  page?: number;

  @IsOptional()
  @Type(() => String)
  // @IsArray()
  @ApiProperty({
    // description: 'Enter properties which multiple columns/property name',
    // required: false,
    // name: 'sort[]',
    // type: 'array',
    example: '_id',
  })
  sort?: string;

  @IsOptional()
  // @Type(() => String)
  @IsEnum(Sorttype)
  @ApiProperty({
    description: 'Enter Asc or desc should property',
    example: Sorttype.Asc,
    required: false,
    name: 'sortby',
    enum: Sorttype,
  })
  sortby?: string|String|Sorttype;
}
