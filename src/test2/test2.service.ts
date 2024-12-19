import { Injectable } from '@nestjs/common';
import { CreateTest2Dto } from './dto/create-test2.dto';
import { UpdateTest2Dto } from './dto/update-test2.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test2 } from './entities/test2.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Test2Service {
  constructor(
    @InjectRepository(Test2)
    private test2Repository: Repository<Test2>
  ){}
  create(createTest2Dto: CreateTest2Dto) {
    const kuyts = this.test2Repository.create(createTest2Dto)
    return this.test2Repository.save(kuyts)
  }

  findAll() {
    return `This action returns all test2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} test2`;
  }

  update(id: number, updateTest2Dto: UpdateTest2Dto) {
    return `This action updates a #${id} test2`;
  }

  remove(id: number) {
    return `This action removes a #${id} test2`;
  }
}
