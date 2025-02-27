import { Injectable } from '@nestjs/common';
import { CreateNfcLogDto } from './dto/create-nfc_log.dto';
import { UpdateNfcLogDto } from './dto/update-nfc_log.dto';
import { NfcLog } from './entities/nfc_log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from 'src/user_info/entities/user_info.entity';

@Injectable()
export class NfcLogService {
    constructor(
      @InjectRepository(NfcLog)
      private nfclogrepository: Repository<NfcLog>,
      @InjectRepository(UserInfo)
      private userRepository: Repository<UserInfo>,
  
    ) {}
    async create(createNfcLogDto: CreateNfcLogDto): Promise<NfcLog> {
      const nfcLog = this.nfclogrepository.create(createNfcLogDto);
      return this.nfclogrepository.save(nfcLog);
  }
  async findAll() {
 
    const logs = await this.nfclogrepository.find();
    
  
    const users = await this.userRepository.find();
    
    
    const result = logs.map(log => {
        const user = users.find(u => u.student_id === log.student_id);
        return {
            ...log,
            firstname: user ? user.first_name : 'Unknown',
            lastname: user ? user.last_name : 'Unknown'
        };
    });
    
    return result;
}

  findOne(id: number) {
    return `This action returns a #${id} nfcLog`;
  }

  update(id: number, updateNfcLogDto: UpdateNfcLogDto) {
    return `This action updates a #${id} nfcLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} nfcLog`;
  }
}
