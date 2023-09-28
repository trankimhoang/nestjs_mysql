import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  createTask(@Body() task: TaskDto): Promise<TaskDto> {
    return this.tasksService.save(task);
  }
}
