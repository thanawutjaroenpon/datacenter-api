import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NfcLogService } from './nfc_log.service';
import { CreateNfcLogDto } from './dto/create-nfc_log.dto';
import { UpdateNfcLogDto } from './dto/update-nfc_log.dto';

@Controller('nfc-log')
export class NfcLogController {
  constructor(private readonly nfcLogService: NfcLogService) {}

  @Post()
  create(@Body() createNfcLogDto: CreateNfcLogDto) {
    return this.nfcLogService.create(createNfcLogDto);
  }

  @Get()
  findAll() {
    return this.nfcLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nfcLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNfcLogDto: UpdateNfcLogDto) {
    return this.nfcLogService.update(+id, updateNfcLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nfcLogService.remove(+id);
  }
}
