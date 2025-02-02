import { Module } from '@nestjs/common';
import { BeaconLogService } from './beacon_log.service';
import { BeaconLogController } from './beacon_log.controller';

@Module({
  controllers: [BeaconLogController],
  providers: [BeaconLogService],
})
export class BeaconLogModule {}
