/*import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoService } from './user_info.service';

describe('UserInfoService', () => {
  let service: UserInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInfoService],
    }).compile();

    service = module.get<UserInfoService>(UserInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
*/
import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoService } from './user_info.service';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';

describe('UserInfoService', () => {
  let service: UserInfoService;
  let repository: jest.Mocked<any>;

  // Mock user data
  const mockUser = {
    id: 1,
    student_id: '64200226',
    first_name: 'sasipong',
    last_name: 'jituae',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserInfoService,
        {
          provide: getRepositoryToken(UserInfo),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserInfoService>(UserInfoService);
    repository = module.get(getRepositoryToken(UserInfo));
  });

  // ✅ TEST CASE 1: User Found
  it('should return user if found', async () => {
    repository.findOne.mockResolvedValue(mockUser);
    const result = await service.finduser('64200226');
    expect(result).toEqual(mockUser);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { student_id: '64200226' },
      select: ['id', 'first_name', 'last_name'],
    });
  });

  // ✅ TEST CASE 2: User Not Found
  it('should throw NotFoundException if user is not found', async () => {
    repository.findOne.mockResolvedValue(undefined);
    await expect(service.finduser('64200226')).rejects.toThrow(NotFoundException);
  });

  // ✅ TEST CASE 3: Database Error Handling
  it('should throw an error if repository fails', async () => {
    repository.findOne.mockRejectedValue(new Error('Database error'));
    await expect(service.finduser('64200226')).rejects.toThrow('Database error');
  });
});
