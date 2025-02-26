import { Injectable } from '@nestjs/common';
import { CreateNfcLogDto } from './dto/create-nfc_log.dto';
import { UpdateNfcLogDto } from './dto/update-nfc_log.dto';

@Injectable()
export class NfcLogService {
  create(createNfcLogDto: CreateNfcLogDto) {
    return 'This action adds a new nfcLog';
  }

  findAll() {
    return `This action returns all nfcLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nfcLog`;
  }

  update(id: number, updateNfcLogDto: UpdateNfcLogDto) {
    return `This action updates a #${id} nfcLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} nfcLog`;
  }
}
