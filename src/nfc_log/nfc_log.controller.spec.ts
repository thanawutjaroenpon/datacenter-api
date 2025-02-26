import { Test, TestingModule } from '@nestjs/testing';
import { NfcLogController } from './nfc_log.controller';
import { NfcLogService } from './nfc_log.service';

describe('NfcLogController', () => {
  let controller: NfcLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NfcLogController],
      providers: [NfcLogService],
    }).compile();

    controller = module.get<NfcLogController>(NfcLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
