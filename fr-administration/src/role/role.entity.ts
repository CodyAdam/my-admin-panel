import { Association } from 'src/associations/association.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => User, { eager: true })
  idUser: User;
  @ManyToOne(() => Association, { eager: true })
  idAssociation: Association;
}
