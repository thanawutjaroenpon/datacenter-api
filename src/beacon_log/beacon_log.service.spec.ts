import { Test, TestingModule } from '@nestjs/testing';
import { BeaconLogService } from './beacon_log.service';
import { Repository } from 'typeorm';
import { BeaconLog } from './entities/beacon_log.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoomStatus } from '../room_status/entities/room_status.entity';

describe('BeaconLogService', () => {
  let service: BeaconLogService;
  let beaconRepository: Repository<BeaconLog>
  let roomStatusRepository: Repository<RoomStatus>

  const mockRommStatus: RoomStatus[] = [
    { id: 1, room_id: "C303", id_beacon: "aa", door_no: 1, user_status: "in", room_status: "open" } as RoomStatus,
  ];

  const mockBeaconLogs: BeaconLog[] = [
    { id: 1, id_beacon: "aa", in_room: new Date() } as BeaconLog,
    { id: 2, id_beacon: "aa", in_room: new Date() } as BeaconLog,
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
    beaconRepository = module.get<Repository<BeaconLog>>(getRepositoryToken(BeaconLog));
    roomStatusRepository = module.get<Repository<RoomStatus>>(getRepositoryToken(RoomStatus));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create and return a beacon log entry', async () => {
  //     const dto = { Room_ID: 'C303', in_room: new Date(), out_room: new Date() };

  //     const result = await service.create(dto as any);
  //     expect(repository.save).toHaveBeenCalledWith(dto);
  //     expect(result).toHaveProperty('id');
  //     expect(result.Room_ID).toBe(dto.Room_ID);
  //   });
  // });

  describe('GetBeaconLog', () => {
    it('should return all beacon logs', async () => {
      const result = await service.GetBeaconLog();
      expect(beaconRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockBeaconLogs);
    });
  });

  describe('GetRooms', () => {
    it('should return only Room_ID, in_room, and out_room fields', async () => {
      const mockRooms = mockBeaconLogs.map(({  in_room }) => ({  in_room }));
      jest.spyOn(beaconRepository, 'find').mockResolvedValue(mockRooms as BeaconLog[]);

      const result = await service.GetRooms();
      expect(beaconRepository.find).toHaveBeenCalledWith({ select: ['Room_ID', 'in_room', 'out_room'] });
      expect(result).toEqual(mockRooms);
    });
  });

});
