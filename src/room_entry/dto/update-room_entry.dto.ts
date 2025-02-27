import { PartialType } from '@nestjs/swagger';
import { CreateRoomEntryDto } from './create-room_entry.dto';

export class UpdateRoomEntryDto extends PartialType(CreateRoomEntryDto) {}
