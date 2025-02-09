import { Module } from '@nestjs/common';
import { BeaconLogService } from './beacon_log.service';
import { BeaconLogController } from './beacon_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeaconLog } from './entities/beacon_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BeaconLog])],
  controllers: [BeaconLogController],
  providers: [BeaconLogService],
})
export class BeaconLogModule {}
