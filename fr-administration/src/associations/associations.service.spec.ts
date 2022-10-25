import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';

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

describe('AssociationsService', () => {
  let service: AssociationsService;
  let repo: Repository<Association>
  let asso: Association
  let user: User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        Repository<Association>,
        {
          provide: getRepositoryToken(Association),
          useFactory: respositoryMockFactory
        }
      ],
    }).compile();

    repo = module.get(getRepositoryToken(Association))
    service = module.get<AssociationsService>(AssociationsService);
    user = {
      id: 0,
      firstname: 'John',
      lastname: 'Doe',
      age: 23
    }
    asso = {
      id: 0,
      name: 'ADAPEI',
      idUsers: Promise.all([user])
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
