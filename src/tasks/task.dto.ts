import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  task_name: string;
}
