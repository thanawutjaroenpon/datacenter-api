import { Test, TestingModule } from '@nestjs/testing';
import { RoomLogController } from './room_log.controller';
import { RoomLogService } from './room_log.service';

describe('RoomLogController', () => {
  let controller: RoomLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomLogController],
      providers: [RoomLogService],
    }).compile();

    controller = module.get<RoomLogController>(RoomLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
