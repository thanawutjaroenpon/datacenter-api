import { PartialType } from '@nestjs/swagger';
import { CreateRoomStatusDto } from './create-room_status.dto';

export class UpdateRoomStatusDto extends PartialType(CreateRoomStatusDto) {}
