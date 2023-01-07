import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AssociationDTO } from './association.dto';
import { Association } from './association.entity';
import { Member } from './association.member';

@Injectable()
export class AssociationsService {
  constructor(
    @InjectRepository(Association)
    private repo: Repository<Association>,
    private roleService: RoleService,
  ) {}

  async getAll(): Promise<Association[]> {
    return await this.repo.find({});
  }
  async findById(id: number): Promise<Association> {
    const res = await this.repo.findOne({ where: { id: id } });
    if (!res)
      throw new HttpException(
        `Association ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return res;
  }
  async create(idUsers: User[], name: string): Promise<Association> {
    const ass = await this.repo.create({
      name,
    });
    ass.idUsers = Promise.resolve(idUsers);
    await this.repo.save(ass);
    return ass;
  }
  async update(
    id: number,
    idUsers: User[],
    name: string,
  ): Promise<Association> {
    const ass = await this.findById(id);

    if (idUsers) ass.idUsers = Promise.resolve(idUsers);
    if (name) ass.name = name;

    await this.repo.save(ass);
    return ass;
  }
  async delete(id: number): Promise<boolean> {
    try {
      const ass = await this.findById(id);
      await this.repo.remove(ass);
      return true;
    } catch (e) {
      return false;
    }
  }
  async mapDTO(asso: Association): Promise<AssociationDTO> {
    const assoDTO = new AssociationDTO();
    assoDTO.name = asso.name;
    const members = (await asso.idUsers).map(async (u) => {
      let role = '';
      try {
        role = (await this.roleService.getByUserAndAsso(u.id, asso.id)).name;
      } catch (e) {}
      const member = new Member();
      member.role = role;
      member.firstname = u.firstname;
      member.age = u.age;
      member.name = u.lastname;
      return member;
    });
    assoDTO.members = await Promise.all(members);
    return assoDTO;
  }
}
