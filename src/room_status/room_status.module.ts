import { Module } from '@nestjs/common';
import { RoomStatusService } from './room_status.service';
import { RoomStatusController } from './room_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomStatus } from './entities/room_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomStatus])],
  controllers: [RoomStatusController],
  providers: [RoomStatusService],
})
export class RoomStatusModule {}
