import { Module } from '@nestjs/common';
import { RoomStatusService } from './room_status.service';
import { RoomStatusController } from './room_status.controller';

@Module({
  controllers: [RoomStatusController],
  providers: [RoomStatusService],
})
export class RoomStatusModule {}
