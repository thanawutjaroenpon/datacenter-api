import { Injectable } from '@nestjs/common';
import { CreateBeaconLogDto } from './dto/create-beacon_log.dto';
import { UpdateBeaconLogDto } from './dto/update-beacon_log.dto';
import { BeaconLog } from './entities/beacon_log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BeaconLogService {

  constructor(
    @InjectRepository(BeaconLog)
    private beaconLogRepository: Repository<BeaconLog>,
  ) {}

  async create(createBeaconLogDto: CreateBeaconLogDto): Promise<BeaconLog> {
    return await this.beaconLogRepository.save(createBeaconLogDto);
  }

  async GetBeaconLog(): Promise<BeaconLog[]> {
    return await this.beaconLogRepository.find();
  }

  async GetRooms(): Promise<Partial<BeaconLog>[]> {
    return await this.beaconLogRepository.find({
      select: {
        in_room: true,
        room: { room_id: true },
      },
      relations: ['room'],
    });
  }

}
