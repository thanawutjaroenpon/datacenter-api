import { Injectable } from '@nestjs/common';
import { CreateRoomEntryDto } from './dto/create-room_entry.dto';
import { UpdateRoomEntryDto } from './dto/update-room_entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RoomEntry } from './entities/room_entry.entity';

@Injectable()
export class RoomEntryService {
    constructor(
        private readonly dataSource: DataSource // Use DataSource for raw queries
    ) {}

    async getAllEntries() {
        return await this.dataSource.query(`SELECT * FROM room_entry_method`);
    }
}
