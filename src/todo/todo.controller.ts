import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Query,
  UseGuards,
  Delete,
  Ip,
  UseInterceptors,
  // Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Pagination } from 'src/task/dto/create-task.dto';
// import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
// import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { CacheKey } from '@nestjs/cache-manager';

@Controller('todo')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }
  // @ApiCookieAuth()
  @UseGuards(ThrottlerGuard)
  @ApiBearerAuth('bearer')
  @Throttle({ shorttime: { ttl: 60000, limit: 100 } })
  @CacheKey('todo')
  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  // @Throttle('shorttime')
  @Get()
  findAll(@Query() searchParam: Pagination) {
    return this.todoService.findAll(searchParam);
  }
  // @UseGuards(ThrottlerGuard)
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

  // @UseGuards(ThrottlerGuard)
  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
