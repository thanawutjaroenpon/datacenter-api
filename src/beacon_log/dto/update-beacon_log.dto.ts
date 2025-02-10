import { PartialType } from '@nestjs/swagger';
import { CreateBeaconLogDto } from './create-beacon_log.dto';

export class UpdateBeaconLogDto extends PartialType(CreateBeaconLogDto) {}
