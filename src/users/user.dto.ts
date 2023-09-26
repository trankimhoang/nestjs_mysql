import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  firstName: string;
  lastName: string;
  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  @Expose()
  fullName;
  @Expose()
  isActive: boolean;
}
