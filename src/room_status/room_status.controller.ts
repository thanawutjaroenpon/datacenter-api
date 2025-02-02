import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomStatusService } from './room_status.service';
import { CreateRoomStatusDto } from './dto/create-room_status.dto';
import { UpdateRoomStatusDto } from './dto/update-room_status.dto';

@Controller('room-status')
export class RoomStatusController {
  constructor(private readonly roomStatusService: RoomStatusService) {}

  @Post()
  create(@Body() createRoomStatusDto: CreateRoomStatusDto) {
    return this.roomStatusService.create(createRoomStatusDto);
  }

  @Get()
  findAll() {
    return this.roomStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomStatusDto: UpdateRoomStatusDto) {
    return this.roomStatusService.update(+id, updateRoomStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomStatusService.remove(+id);
  }
}
