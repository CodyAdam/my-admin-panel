import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Minute } from './minute.entity';
import { MinuteInput } from './minutes.input';
import { MinuteUpdate } from './minutes.update';

@Injectable()
export class MinutesService {
    constructor(
        @InjectRepository(Minute)
        private repo: Repository<Minute>,
        private userService: UsersService,
        private assoService: AssociationsService
        ){}

    async getById(id: number): Promise<Minute> {
        let min = this.repo.findOne({
            where: {
                id: id
            }
        })
        if(!min)
            throw new HttpException("Minute not found", HttpStatus.NOT_FOUND)
        return min
    }
    async create(creation: MinuteInput): Promise<Minute> {
        let users = await Promise.all(creation.idVoters.map(async id => await this.userService.findUser(id)))
        let asso = await this.assoService.findById(creation.idAssocation)
        let min = await this.repo.create({
            users,
            association: asso,
            date: creation.date,
            content: creation.content
        })
        await this.repo.save(min)
        return min
    }
    async update(id: number, update: MinuteUpdate): Promise<Minute> {
        let min = await this.getById(id)
        if(update.content)
            min.content = update.content
        if(update.date)
            min.date = update.content
        if(update.idAssocation)
            min.association = await this.assoService.findById(update.idAssocation)
        if(update.idVoters)
            min.users = await Promise.all(update.idVoters.map(async id => await this.userService.findUser(id)))
        await this.repo.save(min)
        return min
    }
    async delete(id: number): Promise<boolean> {
        try{
            let min = await this.getById(id)
            await this.repo.remove(min)
            return true
        }catch(e){
            return false
        }
    }
    async getAll(): Promise<Minute[]> {
        return await this.repo.find({})
    }
}
