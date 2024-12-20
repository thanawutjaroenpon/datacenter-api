import { PartialType } from '@nestjs/swagger';
import { AuthPayloadDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(AuthPayloadDto) {}
