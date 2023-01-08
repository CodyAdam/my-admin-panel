import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AssociationsService } from '../associations/associations.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private repo: Repository<Role>,
    private usersService: UsersService,
    @Inject(forwardRef(() => AssociationsService))
    private assoService: AssociationsService,
  ) {}

  async create(role: RoleInput): Promise<Role> {
    const obj = await this.repo.create({
      idUser: await this.usersService.getUser(role.idUser),
      idAssociation: await this.assoService.findById(role.idAssociation),
      name: role.name,
    });
    this.repo.save(obj);
    return obj;
  }
  async getByAsso(assoId: number): Promise<Role[]> {
    return await this.repo.find({
      where: {
        idAssociation: {
          id: assoId,
        },
      },
    });
  }
  async getByUserAndAsso(userId: number, assoId: number): Promise<Role> {
    const role = await this.repo.findOne({
      where: {
        idAssociation: {
          id: assoId,
        },
        idUser: {
          id: userId,
        },
      },
    });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    return role;
  }
  async update(user: number, asso: number, role: RoleUpdate): Promise<Role> {
    const r = await this.getByUserAndAsso(user, asso);
    r.name = role.name;
    this.repo.save(r);
    return r;
  }
  async getAll(): Promise<Role[]> {
    return await this.repo.find({});
  }
  async getUsersByName(name: string): Promise<User[]> {
    const roles = await this.repo.find({
      where: {
        name: name,
      },
    });
    const users = roles.map((r) => r.idUser);
    return users;
  }
  async getById(id: number): Promise<Role> {
    const role = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    return role;
  }
  async getByUserId(id: number): Promise<Role[]> {
    const role = await this.repo.find({
      where: {
        idUser: {
          id: id,
        },
      },
    });
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    return role;
  }
  async delete(user: number, asso: number): Promise<boolean> {
    try {
      const role = await this.getByUserAndAsso(user, asso);
      await this.repo.remove(role);
      return true;
    } catch (e) {
      return false;
    }
  }
}
