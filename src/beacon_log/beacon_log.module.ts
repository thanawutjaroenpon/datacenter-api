import { Module } from '@nestjs/common';
import { BeaconLogService } from './beacon_log.service';
import { BeaconLogController } from './beacon_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeaconLog, UserProfile } from './entities/beacon_log.entity';
import { RoomStatus } from '../room_status/entities/room_status.entity';
import { UserInfo } from '../user_info/entities/user_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BeaconLog, UserProfile, RoomStatus, UserInfo])],
  controllers: [BeaconLogController],
  providers: [BeaconLogService],
})
export class BeaconLogModule {}
