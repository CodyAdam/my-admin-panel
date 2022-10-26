import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AssociationsService } from '../associations/associations.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private repo: Repository<Role>,
        private usersService: UsersService,
        private assoService: AssociationsService
    ){}

    async create(role: RoleInput): Promise<Role> {
        let obj = await this.repo.create({
            idUser: await this.usersService.getUser(role.idUser),
            idAssociation: await this.assoService.findById(role.idAssociation),
            name: role.name
        })
        return obj
    }
    async update(id: number, role: RoleUpdate): Promise<Role>{
        let r = await this.getById(id)
        r.name = role.name
        this.repo.save(r)
        return r
    }
    async getAll(): Promise<Role[]>{
        return await this.repo.find({})
    }
    async getById(id: number): Promise<Role>{
        let role = await this.repo.findOne({where: {
            id: id
        }})
        if(!role)
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
        return role
    }
    async delete(id: number): Promise<boolean>{
        try{
            let role = await this.getById(id)
            await this.repo.remove(role)
            return true
        }catch(e){
            return false
        }
    }
}
