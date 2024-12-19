import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  
  async create(createStudentDto: CreateStudentDto) {
    const existingStudent = await this.studentRepository.findOne({
        where: { code: createStudentDto.code },
    });

    if (existingStudent) {
        throw new BadRequestException(`Student with code ${createStudentDto.code} already exists`);
    }
      const student = this.studentRepository.create(createStudentDto)

      return this.studentRepository.save(student)
  }

  findAll() {
    const student = this.studentRepository.find()
    return student;
  }

 async findOne(id: number) {
    const student = await this.studentRepository.findOne({
      where: {id:id}
    })
    if (!student) {
      throw new NotFoundException(`Student with ID #${id} not found`);
  }
    return student;
  }

  async findBycode(code:string){
    const student = await this.studentRepository.findOne({
      where: {code:code}
    })
    if(!student){
      throw new NotFoundException(`Student with code #${code} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
        throw new NotFoundException(`Student with ID #${id} not found`);
    }
    if (updateStudentDto.code) {
        const existingStudent = await this.studentRepository.findOne({
            where: { code: updateStudentDto.code },
        });
        if (existingStudent && existingStudent.id !== id) {
            throw new BadRequestException(`Student with code ${updateStudentDto.code} already exists`);
        }
    }
    Object.assign(student, updateStudentDto); 
    return this.studentRepository.save(student);
}

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
