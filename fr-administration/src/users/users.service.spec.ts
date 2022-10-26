import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../associations/associations.controller.spec';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'
import { jwtConstants } from '../auth/constants';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
}
export const respositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  find: jest.fn(e => e),
  create: jest.fn(e => e),
  save: jest.fn(e => e),
  delete: jest.fn(e => e),
  remove: jest.fn(e => e)
}))

describe('UsersService', () => {
  let service: UsersService;
  let repo: MockType<Repository<User>>
  let user: User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        Repository<User>,
        {
          provide: getRepositoryToken(User),
          useFactory: respositoryMockFactory
        }
      ],
    }).compile();

    user = {
      id: 0,
      firstname: 'John',
      lastname: 'Doe',
      age: 23,
      password: ''
    }

    repo = module.get(getRepositoryToken(User))
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all the users', async () => {
      let expected: User[] = [user]

      repo.find.mockReturnValue(expected)
      expect(await service.getAll()).toBe(expected)
    })
  })
  describe('getOne', () => {
    it('should return one user', async () => {
      repo.findOne.mockReturnValue(user)
      expect(await service.findUser(user.id)).toBe(user)
    })
  })
  describe('create', () => {
    it('should return the new user', async () => {
      let newUserFromBase: User = {
        id: user.id,
        lastname: undefined,
        firstname: undefined,
        age: undefined,
        password: undefined
      }
      repo.create.mockImplementation((e) => {
        e.id = user.id
        return e
      })
      let response = await service.create(user.firstname, user.lastname, user.age, user.password)
      response.password = ''
      expect(response).toStrictEqual(user)
    })
  })
  describe('update', () => {
    it('should return the object updated', async () => {
      let userExpected = user
      userExpected.firstname = 'Joe'

      repo.findOne.mockReturnValue(user)
      expect(await service.updateUser(user.id, 'Joe', undefined, undefined, undefined)).toBe(await userExpected)
    })
    it('should crash', async () => {
      repo.findOne.mockReturnValue(undefined)
      expect(await service.updateUser(user.id, 'Joe', undefined, undefined, undefined).then(()=>false).catch(()=>true)).toBe(true)
    })
  })
  describe('delete', () => {
    it('should return true if user exist', async () => {
      repo.findOne.mockReturnValue(user)
      expect(await service.deleteUser(user.id)).toBe(true)
    })
    it('should return false if user not exist', async () => {
      repo.findOne.mockReturnValue(undefined)
      expect(await service.deleteUser(user.id)).toBe(false)
    })
  })
});
