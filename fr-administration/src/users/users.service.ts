import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../auth/constants';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    @Inject('MAIL_SERVICE')
    private rabbitmq: ClientProxy,
  ) {}

  async findUser(id: number): Promise<User> {
    const res: User = await this.repo.findOne({ where: { id: id } });
    if (!res)
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    return res;
  }

  async search(name: string): Promise<User[]> {
    return await this.repo.find({
      where: [
        { firstname: ILike(`%${name}%`) },
        { lastname: ILike(`%${name}%`) },
        { email: ILike(`%${name}%`) },
      ],
    });
  }
  async findUserByEmail(email: string): Promise<User> {
    const res = await this.repo.findOne({ where: { email: email } });
    if (!res)
      throw new HttpException(`User ${email} not found`, HttpStatus.NOT_FOUND);
    return res;
  }
  async getAll(): Promise<User[]> {
    return await this.repo.find({});
  }
  async create(
    firstname: string,
    lastname: string,
    age: number,
    password: string,
    email: string,
  ): Promise<User> {
    password = await bcrypt.hash(password, jwtConstants.salt);

    try {
      await this.findUserByEmail(email);
    } catch (e) {
      if (e instanceof HttpException && e.getStatus() == HttpStatus.NOT_FOUND) {
        const user = await this.repo.create({
          lastname,
          firstname,
          age,
          password,
          email,
        });
        await this.repo.save(user);

        const record = new RmqRecordBuilder(email)
          .setOptions({
            contentType: 'application/json',
          })
          .build();

        this.rabbitmq.emit('mail', record);

        console.log(`User ${user.email} created`);
        return user;
      }
    }

    throw new HttpException(`User ${email} already exist`, HttpStatus.FOUND);
  }
  async getUser(id: number): Promise<User> {
    return await this.findUser(id);
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.findUserByEmail(email);
  }
  async updateUser(
    id: number,
    firstname: string,
    lastname: string,
    age: number,
    password: string,
    email: string,
  ): Promise<User> {
    const user = await this.findUser(id);
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (age) user.age = age;
    if (password)
      user.password = await bcrypt.hash(password, jwtConstants.salt);
    if (email) user.email = email;
    await this.repo.save(user);
    return user;
  }
  async deleteUser(id: number): Promise<boolean> {
    try {
      const user = await this.findUser(id);
      await this.repo.remove(user);
      return true;
    } catch (e) {
      return false;
    }
  }
}
