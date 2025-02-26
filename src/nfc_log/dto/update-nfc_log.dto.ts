import { PartialType } from '@nestjs/swagger';
import { CreateNfcLogDto } from './create-nfc_log.dto';

export class UpdateNfcLogDto extends PartialType(CreateNfcLogDto) {}
