import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Pagination } from 'src/task/dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Query() searchParam: Pagination) {
    return this.todoService.findAll(searchParam);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.put(id, updateTodoDto);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }
}
