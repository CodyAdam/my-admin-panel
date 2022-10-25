import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Association } from './association.entity';
import { AssociationsController, AssociationCreate, AssociationUpdate } from './associations.controller';
import { AssociationsService } from './associations.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
}

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}))

describe('AssociationsController', () => {
  let controller: AssociationsController;
  let service: AssociationsService
  let userService: UsersService

  let users: Promise<User[]>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationsController],
      providers: [
        AssociationsService,
        {
          provide: getRepositoryToken(Association),
          useFactory: repositoryMockFactory
        },
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory
        }
      ]
    }).compile();

    users = Promise.all([{
      id: 0,
      firstname: 'John',
      lastname: 'Doe',
      age: 23,
      password: ''
    }])
    service = module.get<AssociationsService>(AssociationsService)
    userService = module.get<UsersService>(UsersService)
    controller = module.get<AssociationsController>(AssociationsController);

    jest.spyOn(userService, 'findUser').mockImplementation(async () => (await users)[0])
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all of the associations', async () => {
      let users: Promise<User[]> = Promise.all([{
        id: 0,
        firstname: 'John',
        lastname: 'Doe',
        age: 23,
        password: ''
      }])
      let expected: Promise<Association[]> = Promise.all([{
        id: 0,
        name: 'ADAPEI',
        idUsers: users
      }])

      jest.spyOn(service, 'getAll').mockImplementation(() => expected)
      expect(await controller.getAll()).toBe(await expected)
    })
  })
  describe('getOne', () => {
    it('should return one association', async () => {
      let expected: Promise<Association> = Promise.resolve({
        id: 0,
        name: 'ADAPEI',
        idUsers: users
      })

      jest.spyOn(service, 'findById').mockImplementation(() => expected)
      expect(await controller.getOne(0)).toBe(await expected)
    })
  })
  describe('create', () => {
    it('should return the new association', async () => {
      let assoCreate: AssociationCreate = {
        name: 'ADAPEI',
        idUsers: [0]
      }
      let expected: Promise<Association> = Promise.resolve({
        id: 0,
        name: assoCreate.name,
        idUsers: users
      })

      jest.spyOn(service, 'create').mockImplementation(() => expected)
      expect(await controller.create(assoCreate)).toBe(await expected)
    })
  })
  describe('update', () => {
    it('should return the updated version', async () => {
      let assoUpdate: AssociationUpdate = {
        name: 'ADAPEI22'
      }
      let expected: Promise<Association> = Promise.resolve({
        id: 0,
        name: assoUpdate.name,
        idUsers: users
      })

      jest.spyOn(service, 'update').mockImplementation(() => expected)
      expect(await controller.update(0, assoUpdate)).toBe(await expected)
    })
  })
  describe('delete', () => {
    it('should return true on deletion', async () => {
      let id = 0;

      jest.spyOn(service, 'delete').mockImplementation(async () => true)
      expect(await controller.delete(id)).toBe(true)
    })
  })
});
