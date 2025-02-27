import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomEntryService } from './room_entry.service';
import { CreateRoomEntryDto } from './dto/create-room_entry.dto';
import { UpdateRoomEntryDto } from './dto/update-room_entry.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';


@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('room-entry')
@ApiTags('room-entry')

export class RoomEntryController {
  constructor(private readonly roomEntryService: RoomEntryService) {}


  @Get()
  findAll() {
    return this.roomEntryService.getAllEntries();
  }

}
