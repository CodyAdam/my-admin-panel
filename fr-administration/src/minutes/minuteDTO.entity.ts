import { Association } from 'src/associations/association.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class MinuteDTO {
  id: number;
  date: string;
  content: string;
  users: User[];
}
