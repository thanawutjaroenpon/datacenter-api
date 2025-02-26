import { Module } from '@nestjs/common';
import { NfcLogService } from './nfc_log.service';
import { NfcLogController } from './nfc_log.controller';

@Module({
  controllers: [NfcLogController],
  providers: [NfcLogService],
})
export class NfcLogModule {}
