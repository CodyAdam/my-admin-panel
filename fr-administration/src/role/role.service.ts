import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AssociationsService } from '../associations/associations.service';
import { UsersService } from '../users/users.service';
import { Equal, Repository } from 'typeorm';
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
        @Inject(forwardRef(() => AssociationsService))
        private assoService: AssociationsService
    ){}

    async create(role: RoleInput): Promise<Role> {
        let obj = await this.repo.create({
            idUser: await this.usersService.getUser(role.idUser),
            idAssociation: await this.assoService.findById(role.idAssociation),
            name: role.name
        })
        this.repo.save(obj)
        return obj
    }
    async getByUserAndAsso(userId: number, assoId: number): Promise<Role>{
        let role = await this.repo.findOne({
            where: {
                idAssociation: {
                    id: assoId
                },
                idUser: {
                    id: userId
                }
            }
        })
        if(!role)
            throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
        return role
    }
    async update(user: number, asso: number, role: RoleUpdate): Promise<Role>{
        let r = await this.getByUserAndAsso(user, asso)
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
    async delete(user: number, asso: number): Promise<boolean>{
        try{
            let role = await this.getByUserAndAsso(user, asso)
            await this.repo.remove(role)
            return true
        }catch(e){
            return false
        }
    }
}
