import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'admin',
  })
  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'admin',
  })
  role: string;
}
