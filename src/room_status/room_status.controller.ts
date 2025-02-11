import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomStatusService } from './room_status.service';
import { CreateRoomStatusDto } from './dto/create-room_status.dto';
import { UpdateRoomStatusDto } from './dto/update-room_status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('room-status')
@ApiTags('room')
export class RoomStatusController {
  constructor(private readonly roomStatusService: RoomStatusService) {}

  @Get()
  async GetAllRoomsStatus() {
    return this.roomStatusService.GetAllRoomsStatus();
  }

  @Get(':room')
  async GetMember(@Param('room') id: string) {
    return this.roomStatusService.GetMemberInRoom(id);
  }

}
