import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { Like, Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { plainToInstance } from 'class-transformer';

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

  // async search(task_name: string): Promise<TaskDto[]> {
  //     excludeExtraneousValues: true,
  //   });
  //   // const getTaskByName = await this.taskRepository
  //   //   .createQueryBuilder('tasks')
  //   //   .select('tasks.task_name', 'task_name')
  //   //   .where('tasks.task_name = :task_name', { task_name })
  //   //   .getMany();
  //   //
  //   // return getTaskByName;
  // }

  // C2: createQueryBuilder
  async search(task_name: string): Promise<TaskDto[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('tasks');
    const tasks = await queryBuilder
      .where('tasks.task_name LIKE :task_name', {
        task_name: `%${task_name}%`,
      })
      .getMany();

    return tasks;
  }

  async update(id: number, taskDto: TaskDto) {
    const updateTask = this.taskRepository.update(id, taskDto);

    Object.assign(updateTask, taskDto);
    return updateTask;
  }

  async deleteTaskById(id: number) {
    const deleteTask = this.taskRepository.delete(id);
    return deleteTask;
  }
}
