import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomLogDto } from './dto/create-room_log.dto';
import { UpdateRoomLogDto } from './dto/update-room_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomLog } from './entities/room_log.entity';
import { Repository } from 'typeorm';
import { UserInfo } from '../user_info/entities/user_info.entity';
import { RoomStatus } from '../room_status/entities/room_status.entity';
import { BeaconLog } from '../beacon_log/entities/beacon_log.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class RoomLogService {
  constructor(
    @InjectRepository(RoomLog)
    private roomLogRepository: Repository<RoomLog>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,

    @InjectRepository(BeaconLog)
    private beaconLogRepository: Repository<BeaconLog>,
  ) {}

  async GetAdminLogRoom() {
    const beacons = await this.beaconLogRepository.find();
  
    const students = await this.roomLogRepository.find();
  
    if (!students.length) {
      return `No students found`;
    }
  
    const result = await Promise.all(
      students.map(async (student, index) => {
        const findname = await this.userInfoRepository.findOne({
          where: { student_id: student.Code },
        });
  
        const beacon = beacons.find((b) => b.Room_ID === student.Room_ID);
  
        return {
          id: index + 1,
          code: student.Code,
          firstname: findname?.first_name || "Unknown",
          lastname: findname?.last_name || "Unknown",
          room: student.Room_ID,
          time_enter: beacon?.in_room || null,
          time_exit: beacon?.out_room || null,
        };
      })
    );

    return result;
    }  


    async GetUserLogRoom(code: string) {
      const student = await this.userInfoRepository.findOne({
        where: { student_id: code },
      });
    
      if (!student) {
        return `Student with code ${code} not found`;
      }
    
      const roomLogs = await this.roomLogRepository.find({
        where: { Code: code },
      });
    
      if (!roomLogs.length) {
        return `No room logs found for student ${code}`;
      }
    
      const beacons = await this.beaconLogRepository.find();
    
      const result = roomLogs
        .map((log, index) => {
          const beacon = beacons.find((b) => b.Room_ID === log.Room_ID);
    
          return {
            id: index + 1,
            room: log.Room_ID,
            time_enter: beacon?.in_room || null,
            time_exit: beacon?.out_room || null,
          };
        });
    
      return result;
    }
    

  async AddLog(createRoomLogDto: CreateRoomLogDto) {
    const roomLog = this.roomLogRepository.create(createRoomLogDto);
    return this.roomLogRepository.save(roomLog);
  }


}
