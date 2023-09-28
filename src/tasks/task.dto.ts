import { Expose } from 'class-transformer';

export class TaskDto {
  @Expose()
  id: number;
  @Expose()
  task_name: string;
  @Expose()
  status: number;
}
