import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, Pagination } from './dto/create-task.dto';
import { AnswerDto, PatchTaskDto, UpdateTaskDto } from './dto/update-task.dto';
import { CustomValidationExceptionFilter } from 'src/utils/custom-exception';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('task')
@UseFilters(CustomValidationExceptionFilter)
// @ApiHeaders([
//   {
//     // name: 'Accept-Version',
//     allowEmptyValue: false,
//     // enum: ['v1', 'v2'],
//     required: false,
//   },
// ])
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @ApiBearerAuth('bearer')
  // @ApiConsumes('multipart/form-data')
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() searchParam: Pagination) {
    return this.taskService.findAll(searchParam);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    required: true,
  })
  update(@Param('id') id: string, @Body() updateTaskDto: PatchTaskDto) {
    return this.taskService.patch(id, updateTaskDto);
  }

  @Put(':id')
  put(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
  @ApiTags('replay')
  @Post('replay/:taskid')
  replaycreate(@Body() createTaskDto: AnswerDto, @Param('taskid') id: string) {
    return this.taskService.createReply(id, createTaskDto);
  }
  @ApiTags('replay')
  @Put('replay/:replyid')
  replayupdate(@Param('replyid') id: string, @Body() updateTaskDto: AnswerDto) {
    return this.taskService.updateReply(id, updateTaskDto);
  }
}
