import { PartialType } from '@nestjs/swagger';
import { CreateRoomLogDto } from './create-room_log.dto';

export class UpdateRoomLogDto extends PartialType(CreateRoomLogDto) {}
