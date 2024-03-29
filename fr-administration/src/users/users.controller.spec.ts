import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreation, UsersController, UserUpdate } from './users.controller';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const respositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
  }),
);

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: respositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const expected: Promise<User[]> = Promise.all([
        {
          id: 0,
          firstname: 'John',
          lastname: 'Doe',
          age: 23,
          password: '',
          email: 'fabigoardou@gmail.com',
        },
      ]);
      jest.spyOn(service, 'getAll').mockImplementation(() => expected);
      expect(await controller.getAll()).toBe(await expected);
    });
  });

  describe('getUser', () => {
    it('should return a single user, with the provided id', async () => {
      const expected: Promise<User> = Promise.resolve({
        id: 0,
        firstname: 'John',
        lastname: 'Doe',
        age: 23,
        password: '',
        email: 'fabigoardou@gmail.com',
      });
      jest.spyOn(service, 'findUser').mockImplementation(() => expected);
      expect(await controller.getUser(0)).toBe(await expected);
    });
  });

  describe('create', () => {
    it('should return the new user', async () => {
      const expected: Promise<User> = Promise.resolve({
        id: 1,
        firstname: 'Fab',
        lastname: 'gdou',
        age: 21,
        password: '',
        email: 'fabigoardou@gmail.com',
      });
      const expectedReal = await expected;
      delete expectedReal.id;
      const input: UserCreation = expectedReal;
      jest.spyOn(service, 'create').mockImplementation(() => expected);
      expect(await controller.create(input)).toBe(await expected);
    });
  });
  describe('updateUser', () => {
    it('should return the modified user', async () => {
      const original: Promise<User> = Promise.resolve({
        id: 1,
        firstname: 'Fab',
        lastname: 'gdou',
        age: 21,
        password: '',
        email: 'fabigoardou@gmail.com',
      });
      const expected: Promise<User> = Promise.resolve({
        id: 1,
        firstname: 'Fab',
        lastname: 'gdou',
        age: 22,
        password: '',
        email: 'fabigoardou@gmail.com',
      });
      const modif: UserUpdate = {
        age: 22,
      };

      jest.spyOn(service, 'updateUser').mockImplementation(() => expected);
      expect(await controller.updateUser((await original).id, modif)).toBe(
        await expected,
      );
    });
  });
  describe('deleteUser', () => {
    it('should return true', async () => {
      const id = 0;
      jest.spyOn(service, 'deleteUser').mockImplementation(async () => true);
      expect(await controller.deleteUser(id)).toBe(true);
    });
  });
});
