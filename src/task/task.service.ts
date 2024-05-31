import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto, Pagination, Sorttype } from './dto/create-task.dto';
import { AnswerDto, PatchTaskDto, UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import mongoose, { Model } from 'mongoose';
import { NotFoundMessage } from 'src/utils/constant';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const createNewTask = new this.TaskModel(createTaskDto);
      const saveTask = await createNewTask.save();
      return saveTask;
    } catch (error) {
      Logger.error(error);
      console.log(error, 'error to create task');
      throw new BadRequestException(error.message);
    }
  }

  async findAll(searchParam: Pagination) {
    try {
      const noRecords = searchParam.record || 5;
      let skipRecords = searchParam.skip || 0;
      const page = searchParam.page || 0;
      skipRecords = skipRecords + page * noRecords;
      const sortingArray: any = {
        _id: -1,
      };
      if (searchParam.sort?.length > 0) {
        for (const sortParam of searchParam.sort) {
          sortingArray[sortParam] =
            searchParam.sortby === Sorttype.Asc ? 1 : -1;
        }
      }
      const listAllTask = await this.TaskModel.aggregate([
        {
          $facet: {
            recordCount: [
              {
                $count: 'records',
              },
            ],
            records: [
              {
                $sort: {
                  ...sortingArray,
                },
              },
              {
                $skip: skipRecords,
              },
              {
                $limit: noRecords,
              },
            ],
          },
        },
      ]);
      if (listAllTask[0].records.length === 0) {
        throw new Error(NotFoundMessage);
      }
      return listAllTask[0];
    } catch (error) {
      Logger.error(error);
      if (error.message === NotFoundMessage)
        throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number | string) {
    try {
      const taskDetails = await this.TaskModel.findById(id);
      if (!taskDetails) throw new Error(NotFoundMessage);
      return taskDetails;
    } catch (error) {
      Logger.error(error);
      if (error.message === NotFoundMessage)
        throw new NotFoundException(error.message);
    }
  }

  async update(id: number | string, updateTaskDto: UpdateTaskDto) {
    try {
      const taskDetails = await this.TaskModel.findById(id);
      if (!taskDetails) throw new Error(NotFoundMessage);
      await this.TaskModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { ...updateTaskDto },
      );
      return `Congratulations, Updted Task.`;
    } catch (error) {
      Logger.error(error);
      if (error.message === NotFoundMessage)
        throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async patch(id: number | string, updateTaskDto: PatchTaskDto) {
    try {
      const taskDetails = await this.TaskModel.findById(id);
      if (!taskDetails) throw new Error(NotFoundMessage);
      await this.TaskModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { status: updateTaskDto.status },
      );
      return `Congratulations, Status Updted.`;
    } catch (error) {
      Logger.error(error);
      if (error.message === NotFoundMessage)
        throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number | string) {
    return `This action removes a #${id} task`;
  }

  async createReply(id: number | string, updateTaskDto: AnswerDto) {
    try {
      const taskDetails = await this.TaskModel.findById(id);
      if (!taskDetails) throw new Error(NotFoundMessage);
      await this.TaskModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $push: {
            replayanswer: {
              answer: updateTaskDto.answer,
            },
          },
        },
      );
      return `Congratulations, Replay Added.`;
    } catch (error) {
      Logger.error(error);
      if (error.message === NotFoundMessage)
        throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async updateReply(id: number | string, updateTaskDto: AnswerDto) {
    try {
      const taskDetails = await this.TaskModel.find({
        'replayanswer._id': new mongoose.Types.ObjectId(id),
      });
      if (taskDetails.length === 0) throw new Error(NotFoundMessage);
      await this.TaskModel.updateOne(
        {
          'replayanswer._id': new mongoose.Types.ObjectId(id),
        },
        {
          $set: {
            'replayanswer.$.answer': updateTaskDto.answer,
          },
        },
      );
      return `Congratulations, Replay Updateed.`;
    } catch (error) {
      Logger.error(error);
      if (error.message === NotFoundMessage)
        throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
