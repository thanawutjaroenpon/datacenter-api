import { Injectable } from '@nestjs/common';
import { CreateRoomEntryDto } from './dto/create-room_entry.dto';
import { UpdateRoomEntryDto } from './dto/update-room_entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntry } from './entities/room_entry.entity';

@Injectable()
export class RoomEntryService {
  constructor(
    @InjectRepository(RoomEntry)
    private readonly  roomEntryRepository: Repository <RoomEntry>,

  ) {}

  async getAllEntries() {
    return await this.roomEntryRepository.find();
  }

}
