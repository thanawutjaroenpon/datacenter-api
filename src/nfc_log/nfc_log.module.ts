import { Module } from '@nestjs/common';
import { NfcLogService } from './nfc_log.service';
import { NfcLogController } from './nfc_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NfcLog } from './entities/nfc_log.entity';
import { UserInfo } from '../user_info/entities/user_info.entity';

@Module({
  controllers: [NfcLogController],
  providers: [NfcLogService],
  imports: [TypeOrmModule.forFeature([NfcLog,UserInfo])]
})
export class NfcLogModule {}
