import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomLogService } from './room_log.service';
import { CreateRoomLogDto } from './dto/create-room_log.dto';
import { UpdateRoomLogDto } from './dto/update-room_log.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('room-log')
@ApiTags('RoomLog')
export class RoomLogController {
  constructor(
    private readonly roomLogService: RoomLogService
  ) {}

  @Get()
  async GetAdminLogRoom() {
    return this.roomLogService.GetAdminLogRoom();
  }

  @Get(':code')
  async GetUserLogRoom(@Param('code') code: string) {
    return this.roomLogService.GetUserLogRoom(code);
  }
}
