import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Todo } from './entities/todo.entity';
import { Pagination, Sorttype } from 'src/task/dto/create-task.dto';
import { NotFoundMessage } from 'src/utils/constant';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    const createNewTodo = new this.TodoModel({ ...createTodoDto });
    const savedTodo = await createNewTodo.save();
    return savedTodo;
  }

  async findAll(searchParam: Pagination) {
    try {
      const noRecords = searchParam.record || 5;
      let skipRecords = searchParam.skip || 0;
      const page = searchParam.page || 0;
      const sortingArray: any = {
        _id: -1,
      };
      if (searchParam.sort?.length > 0) {
        for (const sortParam of searchParam.sort) {
          sortingArray[sortParam] =
            searchParam.sortby === Sorttype.Asc ? 1 : -1;
        }
      }
      skipRecords = skipRecords + page * noRecords;
      const listAllTask = await this.TodoModel.aggregate([
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
      if (error.message === NotFoundMessage)
        throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const todoOne = await this.TodoModel.findById(id);
      if (!todoOne) {
        throw new Error(NotFoundMessage);
      }
      return todoOne;
    } catch (error) {
      if (error.message === NotFoundMessage)
        throw new NotFoundException(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number | string, updateTodoDto: UpdateTodoDto) {
    try {
      console.log(updateTodoDto, 'updateTodoDto');
      const todoDetails = await this.TodoModel.findById(id);
      if (!todoDetails) throw new Error(NotFoundMessage);
      const updateStatus = await this.TodoModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $set: {
            ...updateTodoDto,
          },
        },
      );
      console.log(updateStatus, 'updatestaus');
      return updateStatus;
    } catch (error) {
      if (error.message === NotFoundMessage) {
        throw new NotFoundException(error.message);
      } else {
        throw new BadRequestException(
          'Sorry! Some Error occured to update status.',
        );
      }
    }
  }

  async put(id: string | number, updateTodoDto: UpdateTodoDto) {
    try {
      console.log(updateTodoDto, 'updateTodoDto');
      const todoDetails = await this.TodoModel.findById(id);
      if (!todoDetails) throw new Error(NotFoundMessage);
      const updateStatus = await this.TodoModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $set: {
            ...updateTodoDto,
          },
        },
      );
      console.log(updateStatus, 'updatestaus');
      return updateStatus;
    } catch (error) {
      if (error.message === NotFoundMessage) {
        throw new NotFoundException(error.message);
      } else {
        throw new BadRequestException(
          'Sorry! Some Error occured to update status.',
        );
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
