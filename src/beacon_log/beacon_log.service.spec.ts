import { Test, TestingModule } from '@nestjs/testing';
import { BeaconLogService } from './beacon_log.service';

describe('BeaconLogService', () => {
  let service: BeaconLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeaconLogService],
    }).compile();

    service = module.get<BeaconLogService>(BeaconLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
