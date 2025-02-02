import { Injectable } from '@nestjs/common';
import { CreateBeaconLogDto } from './dto/create-beacon_log.dto';
import { UpdateBeaconLogDto } from './dto/update-beacon_log.dto';

@Injectable()
export class BeaconLogService {
  create(createBeaconLogDto: CreateBeaconLogDto) {
    return 'This action adds a new beaconLog';
  }

  findAll() {
    return `This action returns all beaconLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} beaconLog`;
  }

  update(id: number, updateBeaconLogDto: UpdateBeaconLogDto) {
    return `This action updates a #${id} beaconLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} beaconLog`;
  }
}
