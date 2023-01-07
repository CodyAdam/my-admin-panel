import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => User, { eager: false })
  @JoinTable()
  idUsers: Promise<User[]>;
  @Column()
  name: string;
}
