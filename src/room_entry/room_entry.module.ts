import { Module } from '@nestjs/common';
import { RoomEntryService } from './room_entry.service';
import { RoomEntryController } from './room_entry.controller';
import { RoomEntry } from './entities/room_entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RoomEntryController],
  providers: [RoomEntryService],
  imports: [TypeOrmModule.forFeature([RoomEntry])]
})
export class RoomEntryModule {}
