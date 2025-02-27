import { Test, TestingModule } from '@nestjs/testing';
import { NfcLogService } from './nfc_log.service';

describe('NfcLogService', () => {
  let service: NfcLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NfcLogService],
    }).compile();

    service = module.get<NfcLogService>(NfcLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
