import { Test, TestingModule } from '@nestjs/testing';
import { RoomEntryService } from './room_entry.service';

describe('RoomEntryService', () => {
  let service: RoomEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomEntryService],
    }).compile();

    service = module.get<RoomEntryService>(RoomEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
