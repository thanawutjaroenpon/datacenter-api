import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BeaconLogService } from './beacon_log.service';
import { CreateBeaconEventDto, CreateBeaconLogDto } from './dto/create-beacon_log.dto';
import { UpdateBeaconLogDto } from './dto/update-beacon_log.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('beacon-log')
@ApiTags('BeaconLog')
export class BeaconLogController {
  constructor(private readonly beaconLogService: BeaconLogService) {}

  // @Post()
  // async create(@Body() createBeaconLogDto: CreateBeaconLogDto) {
  //   return this.beaconLogService.create(createBeaconLogDto);
  // }

  @Get('GetBeaconLog')
  async GetAllBeaconLog() {
    return this.beaconLogService.GetBeaconLog();
  }
  
  // @Get('GetBeaconByUserId/:userId')
  // async GetBeaconByUserId(@Param('userId') userId: string) {
  //   return this.beaconLogService.GetBeaconByUserId(userId);
  // }

  @Get('findUserProfileBuUserId/:userId')
  async findUserProfileBuUserId(@Param('userId') userId: string) {
    return this.beaconLogService.findUserProfileBuUserId(userId);
  }

  @Get('findLastedTimeStampByUserIdAndHWid/:userId/:hwid')
  async findLastedTimeStampByUserIdAndHWid(@Param('userId') userId: string, @Param('hwid') hwid: string) {
    return this.beaconLogService.findLastedTimeStampByUserIdAndHWid(userId, hwid);
  }

  @Get('GetAllRooms')
  async GetAllRooms() {
    return this.beaconLogService.GetRooms();
  }

  @Get('GetUserProfile')
  async GetAllUserProfile() {
    return this.beaconLogService.findUserProfile();
  }

  @Post('addBeaconEvent')
  async createBeaconEvent(@Body() createBeaconEventDto: CreateBeaconEventDto) {
    return this.beaconLogService.createBeaconEvent(createBeaconEventDto);
  }

  @Patch('update-profile/:userId/:displayname')
  async updateProfile(
  @Param('userId') userId: string,
  @Param('displayname') displayname: string,
) {
  return this.beaconLogService.updateUserProfile(userId, displayname);
}


  
}
