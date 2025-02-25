import { Controller, Get, Post, Patch, Param, Delete, Body, UseGuards, Put, Req } from '@nestjs/common';
import { UserInfoService } from './user_info.service';
import { CreateUserInfoDto } from './dto/create-user_info.dto';
import { UpdateUserInfoDto } from './dto/update-user_info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { get } from 'lodash';
import { request } from 'http';
import { InjectRepository } from '@nestjs/typeorm';


@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('user_info')
@ApiTags('User_Info')
export class UserInfoController {
  constructor(
    private readonly userInfoService: UserInfoService,
  ) {}

  @Post()
  create(@Body() createUserInfoDto: CreateUserInfoDto ,@Req() request) {
    return this.userInfoService.create(createUserInfoDto,request.user.username);
  }

  @Get()
  findAll() {
    return this.userInfoService.findAll();
  }
  @Get('id_card')
  findbycardid(@Param('id_card') id_card:string){
    return this.userInfoService.findbycardid(id_card);
  }
  @Get('profile')
  getbycardUser(@Req() request){
    const currentUser = request.user.username
    return this.userInfoService.Getprofile(currentUser)
  }
  @Get (':id')
  findOne(@Param('id') id: number,@Req() request) {
    const currentUser = request.user
    console.log(currentUser.role)
    // return this.userInfoService.findOne(id);
    }
  
  
  @Get(':student_id')
  findByStudentId(@Param('student_id') student_id: string) {
    return this.userInfoService.findByStudentId(student_id);
  }
  /*
  @Get(':user')//New add 
  finduser(@Param('student_id') student_id: string,) {
    return this.userInfoService.finduser(student_id);
  }*/
    @Get('user/:user')
    async finduser(@Param('user') student_id: string) {
      console.log('Searching for student_id:', student_id); // Show passed param
      const user = await this.userInfoService.finduser(student_id);
      console.log('Found user:', user); // Show returned object
      return user;
    }
  @Get('id/:user')//New add
  findallById(@Param('id') id: number) {
    return this.userInfoService.findAllById(id);
  }

  @Put('id_card/:user')//New add
  updateByid_card(@Param('id_card') id_card: string, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.userInfoService.updateByid_card(id_card, updateUserInfoDto);
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
