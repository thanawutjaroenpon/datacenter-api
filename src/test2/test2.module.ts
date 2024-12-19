import { Module } from '@nestjs/common';
import { Test2Service } from './test2.service';
import { Test2Controller } from './test2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test2 } from './entities/test2.entity';

@Module({
  controllers: [Test2Controller],
  providers: [Test2Service],
  imports:[TypeOrmModule.forFeature([Test2])]
})
export class Test2Module {}
