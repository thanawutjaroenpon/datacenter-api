import { Test, TestingModule } from '@nestjs/testing';
import { BeaconLogService } from './beacon_log.service';
import { Repository } from 'typeorm';
import { BeaconLog } from './entities/beacon_log.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BeaconLogService', () => {
  let service: BeaconLogService;
  let repository: Repository<BeaconLog>

  const mockBeaconLogs: BeaconLog[] = [
    { Beacon_Log_ID: 1, Room_ID: 'A101', in_room: new Date(), out_room: new Date() } as BeaconLog,
    { Beacon_Log_ID: 2, Room_ID: 'B312', in_room: new Date(), out_room: new Date() } as BeaconLog,
  ];

  const mockBeaconLogRepository = {
    save: jest.fn().mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    find: jest.fn().mockResolvedValue(mockBeaconLogs),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeaconLogService,
        {
          provide: getRepositoryToken(BeaconLog),
          useValue: mockBeaconLogRepository,
        },
      ],
    }).compile();

    service = module.get<BeaconLogService>(BeaconLogService);
    repository = module.get<Repository<BeaconLog>>(getRepositoryToken(BeaconLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a beacon log entry', async () => {
      const dto = { Room_ID: 'C303', in_room: new Date(), out_room: new Date() };

      const result = await service.create(dto as any);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('id');
      expect(result.Room_ID).toBe(dto.Room_ID);
    });
  });

  describe('GetBeaconLog', () => {
    it('should return all beacon logs', async () => {
      const result = await service.GetBeaconLog();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockBeaconLogs);
    });
  });

  describe('GetRooms', () => {
    it('should return only Room_ID, in_room, and out_room fields', async () => {
      const mockRooms = mockBeaconLogs.map(({ Room_ID, in_room, out_room }) => ({ Room_ID, in_room, out_room }));
      jest.spyOn(repository, 'find').mockResolvedValue(mockRooms as BeaconLog[]);

      const result = await service.GetRooms();
      expect(repository.find).toHaveBeenCalledWith({ select: ['Room_ID', 'in_room', 'out_room'] });
      expect(result).toEqual(mockRooms);
    });
  });

});
