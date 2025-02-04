import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user_info.dto';
import { UpdateUserInfoDto } from './dto/update-user_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}
  
  async create(createUserInfoDto: CreateUserInfoDto) {
    const userInfo = await this.userInfoRepository.create(createUserInfoDto)
    return this.userInfoRepository.save(userInfo)
  }

  async findOne(id: number) {
    const UserInfo = await this.userInfoRepository.findOne({
      where: {id:id}
    })
    if (!UserInfo) {
      throw new NotFoundException(`UserInfo with ID #${id} not found`);
    }
    return UserInfo;
  }

  async findAll() {
    return await this.userInfoRepository.find();
  }
  
  async findByStudentId(student_id: string) {
    const userInfo = await this.userInfoRepository.findOne({
      where: { student_id },
    });
    if (!userInfo) {
      throw new NotFoundException(`UserInfo with Student ID #${student_id} not found`);
    }
    return userInfo;
  }

  async update(id: number, updateUserInfoDto: UpdateUserInfoDto) {
    const userInfo = await this.userInfoRepository.findOne({ where: { id } });
    if (!userInfo) {
      throw new NotFoundException(`UserInfo with ID #${id} not found`);
    }
    if(updateUserInfoDto.student_id){
      const existingUserInfo = await this.userInfoRepository.findOne({
        where: {  student_id: updateUserInfoDto.student_id },
      });
      if (existingUserInfo && existingUserInfo.id !== id) {
        throw new NotFoundException(`UserInfo with Student ID #${updateUserInfoDto.student_id} already exists`);
      }
    }
    this.userInfoRepository.merge(userInfo, updateUserInfoDto);
    return this.userInfoRepository.save(userInfo);
  }


  async remove(id: number) {
    const userInfo = await this.userInfoRepository.findOne({ where: { id } });

    if (!userInfo) {
      throw new NotFoundException(`UserInfo with ID #${id} not found`);
    }
    return this.userInfoRepository.remove(userInfo);
  }
 
}
