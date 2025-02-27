import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NfcLogService } from './nfc_log.service';
import { CreateNfcLogDto } from './dto/create-nfc_log.dto';
import { UpdateNfcLogDto } from './dto/update-nfc_log.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('NFC-LOG')
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
  @Get('by-nfc-tag')
  @ApiOperation({ summary: 'Get NFC logs by NFC tag' }) // Describes the endpoint
  @ApiQuery({ name: 'nfc_id', required: true, type: String, description: 'The NFC tag to filter logs by' }) // Documents the query parameter
  findByNfcTag(@Query('nfc_id') nfc_id: string) {
    return this.nfcLogService.findByNfcTag(nfc_id);
  }

}
