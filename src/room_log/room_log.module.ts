import { Module } from '@nestjs/common';
import { RoomLogService } from './room_log.service';
import { RoomLogController } from './room_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomLog } from './entities/room_log.entity';
import { UserInfo } from 'src/user_info/entities/user_info.entity';
import { BeaconLog } from 'src/beacon_log/entities/beacon_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomLog, UserInfo, BeaconLog])],
  controllers: [RoomLogController],
  providers: [RoomLogService],
})
export class RoomLogModule {}
