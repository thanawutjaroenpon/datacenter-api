import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,

  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const existingTeacher = await this.teacherRepository.findOne({
      where: { email: createTeacherDto.email },
    });
    if(existingTeacher){
      throw new BadRequestException(`Teacher with email ${createTeacherDto.email} already exists`);
    }
    const teacher = this.teacherRepository.create(createTeacherDto);
    
    return this.teacherRepository.save(teacher);
  }

  findAll() {
    const teacher = this.teacherRepository.find();
    return teacher;
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id: id },
    });
    if(!teacher){
          throw new NotFoundException(`Student with code #${id} not found`);
        }
    return teacher;
  }

  async findByemail(email: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { email: email },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with email #${email} not found`);
    }
    return teacher;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
