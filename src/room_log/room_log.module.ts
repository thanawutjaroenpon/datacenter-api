import { Module } from '@nestjs/common';
import { RoomLogService } from './room_log.service';
import { RoomLogController } from './room_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from '../user_info/entities/user_info.entity';
import { BeaconLog } from '../beacon_log/entities/beacon_log.entity';
import { RoomStatus } from '../room_status/entities/room_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ UserInfo, BeaconLog, RoomStatus])],
  controllers: [RoomLogController],
  providers: [RoomLogService],
})
export class RoomLogModule {}
