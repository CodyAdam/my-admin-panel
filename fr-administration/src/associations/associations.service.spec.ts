import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};
export const respositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((e) => e),
    create: jest.fn((e) => e),
    save: jest.fn((e) => e),
    delete: jest.fn((e) => e),
    remove: jest.fn((e) => e),
  }),
);

describe('AssociationsService', () => {
  let service: AssociationsService;
  let repo: MockType<Repository<Association>>;
  let asso: Association;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssociationsService,
        Repository<Association>,
        {
          provide: getRepositoryToken(Association),
          useFactory: respositoryMockFactory,
        },
      ],
    }).compile();

    repo = module.get(getRepositoryToken(Association));
    service = module.get<AssociationsService>(AssociationsService);
    user = {
      id: 0,
      email: 'random@random.com',
      firstname: 'John',
      lastname: 'Doe',
      age: 23,
      password: '',
    };
    asso = {
      id: 0,
      name: 'ADAPEI',
      idUsers: Promise.all([user]),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all of the associations', async () => {
      repo.find.mockReturnValue([asso]);
      expect(await service.getAll()).toStrictEqual([asso]);
    });
  });
  describe('getOne', () => {
    it('should return one association', async () => {
      repo.findOne.mockReturnValue(asso);
      expect(await service.findById(asso.id)).toBe(asso);
    });
    it('should crash', async () => {
      repo.findOne.mockReturnValue(undefined);
      expect(
        await service
          .findById(0)
          .then(() => false)
          .catch(() => true),
      ).toBe(true);
    });
  });
  describe('create', () => {
    it('should return the new association', async () => {
      repo.create.mockImplementation((e) => {
        e.id = 0;
        return e;
      });
      expect(await service.create([user], asso.name)).toStrictEqual(asso);
    });
  });
  describe('delete', () => {
    it('should return true when exist', async () => {
      repo.findOne.mockReturnValue(asso);
      expect(await service.delete(asso.id)).toBe(true);
    });
    it('should return false when not exist', async () => {
      repo.findOne.mockReturnValue(undefined);
      expect(await service.delete(asso.id)).toBe(false);
    });
  });
  describe('update', () => {
    it('should return the modified object', async () => {
      const modified = asso;
      modified.name = 'ADAPEI22';

      repo.findOne.mockReturnValue(asso);
      expect(await service.update(asso.id, undefined, modified.name)).toBe(
        modified,
      );
    });
  });
});
