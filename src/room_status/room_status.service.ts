import { Injectable } from '@nestjs/common';
import { CreateRoomStatusDto } from './dto/create-room_status.dto';
import { UpdateRoomStatusDto } from './dto/update-room_status.dto';

@Injectable()
export class RoomStatusService {
  create(createRoomStatusDto: CreateRoomStatusDto) {
    return 'This action adds a new roomStatus';
  }

  findAll() {
    return `This action returns all roomStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomStatus`;
  }

  update(id: number, updateRoomStatusDto: UpdateRoomStatusDto) {
    return `This action updates a #${id} roomStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomStatus`;
  }
}
