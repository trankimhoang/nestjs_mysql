import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../users/user.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async save(taskDto: TaskDto): Promise<TaskDto> {
    const saveTask = await this.taskRepository.save(taskDto);
    return plainToInstance(TaskDto, saveTask, {
      excludeExtraneousValues: true,
    });
  }

  async getAll(): Promise<TaskDto[]> {
    const getAll = await this.taskRepository.find();
    return plainToInstance(TaskDto, getAll, {
      excludeExtraneousValues: true,
    });
  }

  async search(task_name: string): Promise<TaskDto> {
    const getTaskByName = await this.taskRepository.findOne({
      where: { task_name: task_name },
    });
    return plainToInstance(TaskDto, getTaskByName, {
      excludeExtraneousValues: true,
    });
    // const getTaskByName = await this.taskRepository
    //   .createQueryBuilder('tasks')
    //   .select('tasks.task_name', 'task_name')
    //   .where('tasks.task_name = :task_name', { task_name })
    //   .getMany();
    //
    // return getTaskByName;
  }
}
