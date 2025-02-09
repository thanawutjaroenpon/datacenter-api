import { Module } from '@nestjs/common';
import { UserInfoService } from './user_info.service';
import { UserInfoController } from './user_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService],
   imports: [TypeOrmModule.forFeature([UserInfo])]
  
})
export class UserInfoModule {}
