import { Test, TestingModule } from '@nestjs/testing';
import { RoomLogController } from './room_log.controller';
import { RoomLogService } from './room_log.service';

describe('RoomLogController', () => {
  let controller: RoomLogController;
  let service: RoomLogService;

  beforeEach(async () => {
    const mockRoomLogService = {
      GetAdminLogRoom: jest.fn(),
      GetUserLogRoom: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomLogController],
      providers: [
        {
          provide: RoomLogService,
          useValue: mockRoomLogService,
        },
      ],
    }).compile();

    controller = module.get<RoomLogController>(RoomLogController);
    service = module.get<RoomLogService>(RoomLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GetAdminLogRoom', () => {
    it('should call RoomLogService.GetAdminLogRoom and return the result', async () => {
      const mockResult = [
        {
          id: 1,
          code: '64200002',
          firstname: 'kottaboung',
          lastname: 'nanvong',
          room: 'A101',
          time_enter: new Date(),
          time_exit: new Date(),
        },
      ];
      
      jest.spyOn(service, 'GetAdminLogRoom').mockResolvedValue(mockResult);
  
      const result = await controller.GetAdminLogRoom();
      expect(service.GetAdminLogRoom).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('GetUserLogRoom', () => {
    it('should call RoomLogService.GetUserLogRoom with the correct code and return the result', async () => {
      const mockCode = '64200002';
      const mockResult = [{ id: 1, room: 'A101', time_enter: new Date(), time_exit: new Date() }];
      jest.spyOn(service, 'GetUserLogRoom').mockResolvedValue(mockResult);

      const result = await controller.GetUserLogRoom(mockCode);
      expect(service.GetUserLogRoom).toHaveBeenCalledWith(mockCode);
      expect(result).toEqual(mockResult);
    });
  });
});
