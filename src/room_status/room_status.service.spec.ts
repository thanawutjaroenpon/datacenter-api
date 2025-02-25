import { Test, TestingModule } from '@nestjs/testing';
import { RoomStatusService } from './room_status.service';
import { Repository } from 'typeorm';
import { RoomStatus } from './entities/room_status.entity';
import { UserInfo } from '../user_info/entities/user_info.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

// describe('RoomStatusService', () => {
//   let service: RoomStatusService;
//   let roomStatusRepository: Repository<RoomStatus>;
//   let userInfoRepository: Repository<UserInfo>;
//   let roomLogRepository: Repository<RoomLog>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         RoomStatusService,
//         {
//           provide: getRepositoryToken(RoomStatus),
//           useClass: Repository,
//         },
//         {
//           provide: getRepositoryToken(UserInfo),
//           useClass: Repository,
//         },
//         {
//           provide: getRepositoryToken(RoomLog),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     service = module.get<RoomStatusService>(RoomStatusService);
//     roomStatusRepository = module.get<Repository<RoomStatus>>(getRepositoryToken(RoomStatus));
//     userInfoRepository = module.get<Repository<UserInfo>>(getRepositoryToken(UserInfo));
//     roomLogRepository = module.get<Repository<RoomLog>>(getRepositoryToken(RoomLog));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('GetAllRoomsStatus', () => {
//     it('should return all room status', async () => {
//       const Room: RoomStatus[] = [
//         {
//           Room_Status_ID: 1,
//           Room_ID: '1',
//           room_status: true,
//           item_status: true,
//           beacon: [],
//         },
//         {
//           Room_Status_ID: 2,
//           Room_ID: '2',
//           room_status: true,
//           item_status: true,
//           beacon: [],
//         }
//       ];

//       jest.spyOn(roomStatusRepository, 'find').mockResolvedValue(Room);

//       const result = await service.GetAllRoomsStatus();
//       expect(roomStatusRepository.find).toHaveBeenCalled();
//       expect(result).toEqual(Room);
//     });
//   });

//   describe('GetMemberInRoom', () => {
//     it('should return "Room not found" if room not found', async () => {
//       jest.spyOn(roomStatusRepository, 'findOne').mockResolvedValue(null);

//       const result = await service.GetMemberInRoom('A101');
//       expect(result).toEqual('Room A101 not found');
//     });

//     it('should return "No active members found in Room A101" if no active members found', async () => {

//       jest.spyOn(roomStatusRepository, 'findOne').mockResolvedValue({ Room_ID: 'A101' } as RoomStatus);
//       jest.spyOn(roomLogRepository, 'createQueryBuilder').mockReturnValue({
//         select: jest.fn().mockReturnThis(),
//         where: jest.fn().mockReturnThis(),
//         andWhere: jest.fn().mockReturnThis(),
//         getRawMany: jest.fn().mockResolvedValue([]),
//       }as any);

//       const result = await service.GetMemberInRoom('A101');
//       expect(result).toEqual('No active members found in Room A101');
//     });

//     it('should return active members in room', async () => {
//       jest.spyOn(roomStatusRepository, 'findOne').mockResolvedValue({ Room_ID: 'A101' } as RoomStatus);

//       const Logs = [
//         { Code: '64200002', Status: 'IN', Time: new Date() },
//         { Code: '64200003', Status: 'IN', Time: new Date() },
//       ];

//       jest.spyOn(roomLogRepository, 'createQueryBuilder').mockReturnValue({
//         select: jest.fn().mockReturnThis(),
//         where: jest.fn().mockReturnThis(),
//         andWhere: jest.fn().mockReturnThis(),
//         getRawMany: jest.fn().mockResolvedValue(Logs),
//       } as any);

//       jest.spyOn(userInfoRepository, 'find').mockResolvedValue([
//         { student_id: '64200002', first_name: 'kottaboung', last_name: 'nanvong' } as UserInfo
//       ]);

//       const result = await service.GetMemberInRoom('A101');
//       expect(result).toEqual([
//         {
//           firstname: 'kottaboung',
//           lastname: 'nanvong',
//           code: '64200002',
//         }
//       ]);
//     })
//   });
// });
