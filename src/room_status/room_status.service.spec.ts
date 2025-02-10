import { Test, TestingModule } from '@nestjs/testing';
import { RoomStatusService } from './room_status.service';

describe('RoomStatusService', () => {
  let service: RoomStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomStatusService],
    }).compile();

    service = module.get<RoomStatusService>(RoomStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
