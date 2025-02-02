import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeaconLogService } from './beacon_log.service';
import { CreateBeaconLogDto } from './dto/create-beacon_log.dto';
import { UpdateBeaconLogDto } from './dto/update-beacon_log.dto';

@Controller('beacon-log')
export class BeaconLogController {
  constructor(private readonly beaconLogService: BeaconLogService) {}

  @Post()
  create(@Body() createBeaconLogDto: CreateBeaconLogDto) {
    return this.beaconLogService.create(createBeaconLogDto);
  }

  @Get()
  findAll() {
    return this.beaconLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beaconLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeaconLogDto: UpdateBeaconLogDto) {
    return this.beaconLogService.update(+id, updateBeaconLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beaconLogService.remove(+id);
  }
}
