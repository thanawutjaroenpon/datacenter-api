import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user_info.dto';
import { UpdateUserInfoDto } from './dto/update-user_info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './entities/user_info.entity';
import { Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>
  ) {}
  
  async create(createUserInfoDto: CreateUserInfoDto , currentUser:string) {
    const userInfo = await this.userInfoRepository.create(createUserInfoDto)
    const userdoc = await this.userInfoRepository.save(userInfo)
    const findid_card = await this.authRepository.findOne({where:{username:currentUser}})
    const sendid_card = await this.authRepository.update(findid_card.id,{id_card:createUserInfoDto.id_card})
  
    return { userInfo: userdoc, auth: sendid_card };

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
  async findbycardid(id_card:string){
    const Card_id = await this.userInfoRepository.findOne({
      where:{id_card:id_card}
    })
    return Card_id
  }

  async findAll() {
    return await this.userInfoRepository.find();
  }
  async findAllById(id: number) {
    const userInfo = await this.userInfoRepository.findOne({ where: { id } });
    if (!userInfo) {
      throw new NotFoundException(`UserInfo with ID #${id} not found`);
    }
    return userInfo;
  }
  async findByStudentId(student_id: string) {
    const userInfo = await this.userInfoRepository.findOne({
      where: { student_id},
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

  async finduser(student_id: string) {
    console.log(`Searching for student_id: ${student_id}`); // Incoming param check
  
    const user = await this.userInfoRepository.findOne({
      where: { student_id: student_id },
      select: ['id_card', 'first_name', 'last_name','Position','student_id'],
    });
  
    console.log('Database query result:', user); // Database response check
  
    if (!user) {
      throw new NotFoundException(`User with Student ID #${student_id} not found`);
    }
  
    return user;
  }

  async updateByStudent_id(student_id: string, updateUserInfoDto: UpdateUserInfoDto) {
    const userInfo = await this.userInfoRepository.findOne({ where: { student_id } });
    if (!userInfo) {
      throw new NotFoundException(`UserInfo with ID #${student_id} not found`);
    }
    if(updateUserInfoDto.student_id && updateUserInfoDto.student_id !== userInfo.student_id){
      const existingUserstudent_id = await this.userInfoRepository.findOne({
        where: {  student_id: updateUserInfoDto.student_id },
      });
      if (existingUserstudent_id) {
        throw new NotFoundException(`UserInfo with Student ID #${updateUserInfoDto.student_id} already exists`);
      }
    }
    await this.userInfoRepository.update(student_id, updateUserInfoDto);

    return this.userInfoRepository.findOne({ where: { student_id } });
  }


  async Getprofile(currentUser:string){
  if(!currentUser){
    throw new NotFoundException("DATA_NOTFOUND")
  }
  const user = currentUser
  const user2 = await this.authRepository.findOne({where:{username:user}})
  const profile = await this.userInfoRepository.findOne({where:{id_card:user2.id_card}})
  return profile
  }
 
}
