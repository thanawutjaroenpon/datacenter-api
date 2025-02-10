import { Test, TestingModule } from '@nestjs/testing';
import { BeaconLogController } from './beacon_log.controller';
import { BeaconLogService } from './beacon_log.service';

describe('BeaconLogController', () => {
  let controller: BeaconLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeaconLogController],
      providers: [BeaconLogService],
    }).compile();

    controller = module.get<BeaconLogController>(BeaconLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
