import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  createTask(@Body() task: TaskDto): Promise<TaskDto> {
    return this.tasksService.save(task);
  }

  @Get()
  getAll(): Promise<TaskDto[]> {
    return this.tasksService.getAll();
  }

  @Get(':task_name')
  search(@Param('task_name') task_name: string): Promise<TaskDto> {
    return this.tasksService.search(task_name);
  }
}
