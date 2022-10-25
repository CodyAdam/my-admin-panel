import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/associations/associations.controller.spec';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
}
export const respositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  find: jest.fn(e => e)
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
      age: 23
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
});
