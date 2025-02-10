import { Module } from '@nestjs/common';
import { RoomStatusService } from './room_status.service';
import { RoomStatusController } from './room_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomStatus } from './entities/room_status.entity';
import { UserInfo } from 'src/user_info/entities/user_info.entity';
import { RoomLog } from 'src/room_log/entities/room_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomStatus,UserInfo,RoomLog])],
  controllers: [RoomStatusController],
  providers: [RoomStatusService],
})
export class RoomStatusModule {}
