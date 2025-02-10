import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BeaconLogService } from './beacon_log.service';
import { CreateBeaconLogDto } from './dto/create-beacon_log.dto';
import { UpdateBeaconLogDto } from './dto/update-beacon_log.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('beacon-log')
@ApiTags('BeaconLog')
export class BeaconLogController {
  constructor(private readonly beaconLogService: BeaconLogService) {}

  @Post()
  async create(@Body() createBeaconLogDto: CreateBeaconLogDto) {
    return this.beaconLogService.create(createBeaconLogDto);
  }

  @Get()
  async GetAllBeaconLog() {
    return this.beaconLogService.GetBeaconLog();
  }

  @Get()
  async GetAllRooms() {
    return this.beaconLogService.GetRooms();
  }

  

  
}
