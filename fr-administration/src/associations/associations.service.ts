import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/users/user.entity';
import { ILike, Repository } from 'typeorm';
import { AssociationDTO } from './association.dto';
import { Association } from './association.entity';
import { Member } from './association.member';
import { MinutesService } from '../minutes/minutes.service';

@Injectable()
export class AssociationsService {
  constructor(
    @InjectRepository(Association)
    private repo: Repository<Association>,
    private roleService: RoleService,
    private minutesService: MinutesService,
  ) {}

  async search(name: string): Promise<Association[]> {
    return await this.repo.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

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
  async create(name: string): Promise<Association> {
    const ass = await this.repo.create({
      name,
    });
    await this.repo.save(ass);
    return ass;
  }
  removeDuplicates(users: User[]): User[] {
    return users.filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    });
  }
  async update(id: number, name: string): Promise<Association> {
    const ass = await this.findById(id);

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
    assoDTO.id = asso.id;
    const members = (await this.roleService.getByAsso(asso.id)).map((role) => {
      const u = role.idUser;
      const member = new Member();
      member.role = role.name;
      member.firstname = u.firstname;
      member.age = u.age;
      member.name = u.lastname;
      member.id = u.id;
      member.email = u.email;
      return member;
    });
    assoDTO.members = await Promise.all(members);
    assoDTO.minutes = (await this.minutesService.getByAsso(asso.id)).map((m) =>
      this.minutesService.mapToDTO(m),
    );
    return assoDTO;
  }
}
