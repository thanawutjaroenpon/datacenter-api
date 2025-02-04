import { PartialType } from '@nestjs/swagger';
import { CreateUserInfoDto } from './create-user_info.dto';

export class UpdateUserInfoDto extends PartialType(CreateUserInfoDto) {}
