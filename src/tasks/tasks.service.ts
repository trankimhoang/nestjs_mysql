import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { Repository } from 'typeorm';
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
}
