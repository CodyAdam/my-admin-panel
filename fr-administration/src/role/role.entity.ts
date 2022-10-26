import { Association } from "src/associations/association.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @OneToOne(() => User)
    idUser: User
    @OneToOne(() => Association)
    idAssociation: Association
}