import { Controller, Get, Post, Patch, Param, Delete, Body, UseGuards, Put } from '@nestjs/common';
import { UserInfoService } from './user_info.service';
import { CreateUserInfoDto } from './dto/create-user_info.dto';
import { UpdateUserInfoDto } from './dto/update-user_info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { get } from 'lodash';


@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('user_info')
@ApiTags('User_Info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  create(@Body() createUserInfoDto: CreateUserInfoDto) {
    return this.userInfoService.create(createUserInfoDto);
  }

  @Get()
  findAll() {
    return this.userInfoService.findAll();
  }
  @Get (':id')
  findOne(@Param('id') id: string) {
    return this.userInfoService.findByStudentId(id);
    }
  @Get(':student_id')
  findByStudentId(@Param('student_id') student_id: string) {
    return this.userInfoService.findByStudentId(student_id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.userInfoService.update(+id, updateUserInfoDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInfoService.remove(+id);
  }
}
