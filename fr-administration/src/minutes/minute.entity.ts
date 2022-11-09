import { Association } from "src/associations/association.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Minute{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    date: string
    @Column()
    content: string
    @ManyToMany(() => User, {eager: true})
    users: User[]
    @ManyToOne(() => Association, {eager: true})
    association: Association
}