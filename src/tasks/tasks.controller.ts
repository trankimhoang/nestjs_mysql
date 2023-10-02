import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Get('search')
  search(@Query('task_name') task_name: string): Promise<TaskDto[]> {
    return this.tasksService.search(task_name);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() task: TaskDto) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: number) {
    return this.tasksService.deleteTaskById(id);
  }
}
