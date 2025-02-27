import { Test, TestingModule } from '@nestjs/testing';
import { RoomEntryController } from './room_entry.controller';
import { RoomEntryService } from './room_entry.service';

describe('RoomEntryController', () => {
  let controller: RoomEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomEntryController],
      providers: [RoomEntryService],
    }).compile();

    controller = module.get<RoomEntryController>(RoomEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
