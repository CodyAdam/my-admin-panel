import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastname: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  password: string;

  @Column()
  email: string;
}
