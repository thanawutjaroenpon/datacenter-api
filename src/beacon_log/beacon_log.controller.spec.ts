import { Test, TestingModule } from '@nestjs/testing';
import { BeaconLogController } from './beacon_log.controller';
import { BeaconLogService } from './beacon_log.service';
import { CreateBeaconLogDto } from './dto/create-beacon_log.dto';

describe('BeaconLogController', () => {
  let controller: BeaconLogController;
  let service: BeaconLogService;

  const mockBeaconLogs = [
    { id: 1, Room_ID: 'A101', in_room: new Date(), out_room: new Date() },
    { id: 2, Room_ID: 'B202', in_room: new Date(), out_room: new Date() },
  ];

  const mockBeaconLogService = {
    create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    GetBeaconLog: jest.fn().mockResolvedValue(mockBeaconLogs),
    GetRooms: jest.fn().mockResolvedValue(mockBeaconLogs.map(({ Room_ID, in_room, out_room }) => ({ Room_ID, in_room, out_room }))),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeaconLogController],
      providers: [
        {
          provide: BeaconLogService,
          useValue: mockBeaconLogService,
        },
      ],
    }).compile();

    controller = module.get<BeaconLogController>(BeaconLogController);
    service = module.get<BeaconLogService>(BeaconLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a beacon log entry', async () => {
      const dto: CreateBeaconLogDto = { Room_ID: 'C303', in_room: new Date(), out_room: new Date() } as CreateBeaconLogDto;

      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('id');
      expect(result.Room_ID).toBe(dto.Room_ID);
    });
  });

  describe('GetAllBeaconLog', () => {
    it('should return all beacon logs', async () => {
      const result = await controller.GetAllBeaconLog();
      expect(service.GetBeaconLog).toHaveBeenCalled();
      expect(result).toEqual(mockBeaconLogs);
    });
  });

  describe('GetAllRooms', () => {
    it('should return only Room_ID, in_room, and out_room fields', async () => {
      const mockRooms = mockBeaconLogs.map(({ Room_ID, in_room, out_room }) => ({ Room_ID, in_room, out_room }));

      const result = await controller.GetAllRooms();
      expect(service.GetRooms).toHaveBeenCalled();
      expect(result).toEqual(mockRooms);
    });
  });
});
