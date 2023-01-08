import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Minute } from './minute.entity';
import { MinuteInput } from './minutes.input';
import { MinuteUpdate } from './minutes.update';
import {MinuteDTO} from "./minuteDTO.entity";

@Injectable()
export class MinutesService {
  constructor(
    @InjectRepository(Minute)
    private repo: Repository<Minute>,
    private userService: UsersService,
    @Inject(forwardRef(() => AssociationsService))
    private assoService: AssociationsService,
  ) {}

  async getById(id: number): Promise<Minute> {
    const min = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    if (!min) throw new HttpException('Minute not found', HttpStatus.NOT_FOUND);
    return min;
  }
  mapToDTO(minute: Minute): MinuteDTO {
    const min = new MinuteDTO();
    min.date = minute.date;
    min.content = minute.content;
    min.id = minute.id;
    min.users = minute.users;
    return min;
  }
  async getByAsso(
    asso: number,
    sort?: string,
    order?: string,
  ): Promise<Minute[]> {
    if (!sort) sort = 'id';
    if (!order) order = 'ASC';

    const orderObj = {};
    orderObj[sort] = { name: order };
    const minutes = await this.repo.find({
      where: {
        association: {
          id: asso,
        },
      },
      order: orderObj,
    });
    return minutes;
  }
  async create(creation: MinuteInput): Promise<Minute> {
    const users = await Promise.all(
      creation.idVoters.map(async (id) => await this.userService.findUser(id)),
    );
    const asso = await this.assoService.findById(creation.idAssociation);
    const min = await this.repo.create({
      users,
      association: asso,
      date: creation.date,
      content: creation.content,
    });
    await this.repo.save(min);
    return min;
  }
  async update(id: number, update: MinuteUpdate): Promise<Minute> {
    const min = await this.getById(id);
    if (update.content) min.content = update.content;
    if (update.date) min.date = update.content;
    if (update.idAssocation)
      min.association = await this.assoService.findById(update.idAssocation);
    if (update.idVoters)
      min.users = await Promise.all(
        update.idVoters.map(async (id) => await this.userService.findUser(id)),
      );
    await this.repo.save(min);
    return min;
  }
  async delete(id: number): Promise<boolean> {
    try {
      const min = await this.getById(id);
      await this.repo.remove(min);
      return true;
    } catch (e) {
      return false;
    }
  }
  async getAll(): Promise<Minute[]> {
    return await this.repo.find({});
  }
}
