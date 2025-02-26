import { Injectable } from '@nestjs/common';
import { CreateRoomStatusDto } from './dto/create-room_status.dto';
import { UpdateRoomStatusDto } from './dto/update-room_status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomStatus } from './entities/room_status.entity';
import { In, Not, LessThan, Repository } from 'typeorm';

@Injectable()
export class RoomStatusService {
  constructor(
    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,

  ) {}
 
 async GetAllRoomsStatus(): Promise<RoomStatus[]> {
    return await this.roomStatusRepository.find();
  }

  
}
