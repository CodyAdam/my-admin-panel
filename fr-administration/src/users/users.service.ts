import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repo: Repository<User>
    ){}

    async findUser(id: number): Promise<User> {
        let res: User = await this.repo.findOne({where: {id: id}})
        if(!res)
            throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND)
        return res
    }
    async getAll(): Promise<User[]> {
        return await this.repo.find({})
    }
    async create(firstname: string, lastname: string, age: number): Promise<User> {
        let user = await this.repo.create({
            lastname,
            firstname,
            age
        })
        await this.repo.save(user)
        return user
    }
    async getUser(id: number): Promise<User> {
        return await this.findUser(id)
    }
    async updateUser(id: number, firstname: string, lastname: string, age: number): Promise<User> {
        let user = await this.findUser(id)
        if(firstname)
            user.firstname = firstname
        if(lastname)
            user.lastname = lastname
        if(age)
            user.age = age
        await this.repo.save(user)
        return user
    }
    async deleteUser(id: number): Promise<boolean> {
        try{
            let user = await this.findUser(id)
            await this.repo.remove(user)
            return true
        }catch(e){
            return false
        }
    }
}
