import { Test, TestingModule } from '@nestjs/testing';
import { RoomStatusController } from './room_status.controller';
import { RoomStatusService } from './room_status.service';

describe('RoomStatusController', () => {
  let controller: RoomStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomStatusController],
      providers: [RoomStatusService],
    }).compile();

    controller = module.get<RoomStatusController>(RoomStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
