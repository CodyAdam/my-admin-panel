import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { threadId } from 'worker_threads';
import { Association } from './association.entity';

@Injectable()
export class AssociationsService {

    constructor(
        @InjectRepository(Association)
        private repo: Repository<Association>
    ){}

    async getAll(): Promise<Association[]> {
        return await this.repo.find({})
    }
    async findById(id: number): Promise<Association> {
        let res = await this.repo.findOne({where: {id: id}})
        if(!res)
            throw new HttpException(`Association ${id} not found`, HttpStatus.NOT_FOUND)
        return res
    }
    async create(idUsers: User[], name: string): Promise<Association> {
        let ass = await this.repo.create({
            idUsers: Promise.resolve(idUsers),
            name
        })
        await this.repo.save(ass)
        return ass
    }
    async update(id: number, idUsers: User[], name: string): Promise<Association> {
        let ass = await this.findById(id)

        if(idUsers)
            ass.idUsers = Promise.resolve(idUsers)
        if(name)
            ass.name = name

        await this.repo.save(ass)
        return ass
    }
    async delete(id: number): Promise<boolean>{
        let ass = await this.findById(id)
        await this.repo.remove(ass)
        return true
    }
}
