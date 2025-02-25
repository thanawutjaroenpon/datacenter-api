import { Test, TestingModule } from '@nestjs/testing';
import { RoomLogService } from './room_log.service';
import { Repository } from 'typeorm';
//import { RoomLog, Status } from './entities/room_log.entity';
import { BeaconLog } from '../beacon_log/entities/beacon_log.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInfo } from './../user_info/entities/user_info.entity';

describe('RoomLogService', () => {
  let service: RoomLogService;
  //let roomLogRepository: Repository<RoomLog>;
  let userInfoRepository: Repository<UserInfo>;
  let beaconLogRepository: Repository<BeaconLog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomLogService,
        // {
        //   provide: getRepositoryToken(RoomLog),
        //   useValue:{
        //     find: jest.fn(),
        //     findOne: jest.fn(),
        //     create: jest.fn(),
        //     save: jest.fn(),
        //   }
        // },
        {
          provide: getRepositoryToken(UserInfo),
          useValue:{
            findOne: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(BeaconLog),
          useValue:{
            find: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<RoomLogService>(RoomLogService);
    //roomLogRepository = module.get<Repository<RoomLog>>(getRepositoryToken(RoomLog));
    userInfoRepository = module.get<Repository<UserInfo>>(getRepositoryToken(UserInfo));
    beaconLogRepository = module.get<Repository<BeaconLog>>(getRepositoryToken(BeaconLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetAdminLogRoom', () => {
    it('should return "No students found" when there are no student', async () => {
      jest.spyOn(beaconLogRepository, 'find').mockResolvedValue([]);
      const result = await service.GetAdminLogRoom();
      expect(result).toBe('No students found');
    });

    it('should return an array of students', async () => {
      const roomLog = new BeaconLog();
      roomLog.line_name_id = '64200002';
      roomLog.room.room_id = 'A101';
      jest.spyOn(beaconLogRepository, 'find').mockResolvedValue([roomLog]);

      const userInfo = new UserInfo();
      userInfo.student_id = '64200002';
      userInfo.first_name = 'kottaboung';
      userInfo.last_name = 'nanvong';
      jest.spyOn(userInfoRepository, 'findOne').mockResolvedValue(userInfo);

      const beaconLog = new BeaconLog();
      beaconLog.room.room_id = 'A101';
      beaconLog.in_room = new Date();
      jest.spyOn(beaconLogRepository, 'find').mockResolvedValue([beaconLog]);

      const result = await service.GetAdminLogRoom();
      expect(result).toEqual([
        {
          id: 1,
          code: '64200002',
          firstname: 'kottaboung',
          lastname: 'nanvong',
          room: 'A101',
          time_enter: beaconLog.in_room,
          time_exit: null,
        }
      ]);
    });
  });

  describe('GetUserLogRoom', () => {
    const userInfo = new UserInfo();
    userInfo.student_id = '64200002';
    userInfo.first_name = 'kottaboung';
    userInfo.last_name = 'nanvong';
  
    // const roomLog = new RoomLog();
    // roomLog.Room_Log_ID = 1;
    // roomLog.Code = '64200002';
    // roomLog.Room_ID = 'A101';
    // roomLog.Time = new Date();
    // roomLog.Status = Status.IN;
  
    const beaconLog = new BeaconLog();
    beaconLog.id = 1;
    beaconLog.room.room_id = 'A101';
    beaconLog.in_room = new Date();
  
    it('should return "Student with code 64200002 not found" if student does not exist', async () => {
      jest.spyOn(userInfoRepository, 'findOne').mockResolvedValue(null);
      const result = await service.GetUserLogRoom('64200002');
      expect(result).toBe('Student with code 64200002 not found');
    });
  
    it('should return "No room logs found" if no logs exist', async () => {
      jest.spyOn(userInfoRepository, 'findOne').mockResolvedValue(userInfo);
      jest.spyOn(beaconLogRepository, 'find').mockResolvedValue([]);
      const result = await service.GetUserLogRoom('64200002');
      expect(result).toBe('No room logs found for student 64200002');
    });
  
    it('should return user logs correctly', async () => {
      jest.spyOn(userInfoRepository, 'findOne').mockResolvedValue(userInfo);
      jest.spyOn(beaconLogRepository, 'find').mockResolvedValue([beaconLog]);
  
      const result = await service.GetUserLogRoom('64200002');
      expect(result).toEqual([
        {
          id: 1,
          room: 'A101',
          time_enter: beaconLog.in_room,
        }
      ]);
    });
  });  

});


