import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomLogDto } from './dto/create-room_log.dto';
import { UpdateRoomLogDto } from './dto/update-room_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
//import { RoomLog } from './entities/room_log.entity';
import { Repository } from 'typeorm';
import { UserInfo } from '../user_info/entities/user_info.entity';
import { RoomStatus } from '../room_status/entities/room_status.entity';
import { BeaconLog } from '../beacon_log/entities/beacon_log.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class RoomLogService {
  constructor(
    // @InjectRepository(RoomLog)
    // private roomLogRepository: Repository<RoomLog>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,

    @InjectRepository(BeaconLog)
    private beaconLogRepository: Repository<BeaconLog>,
    
    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,
  ) {}

  async GetAdminLogRoom() {
    const beacons = await this.beaconLogRepository.find();
  
    //const students = await this.roomLogRepository.find();
  
    if (!beacons.length) {
      return `No students found`;
    }
  
    const result = await Promise.all(
      beacons.map(async (student, index) => {
        const findname = await this.userInfoRepository.findOne({
          where: { student_id:  student.line_name_id },
        });

        //const beacon = beacons.find((b) => b.Room_ID === student.Room_ID);
  
        return {
          id: index + 1,
          code: student.line_name_id ,
          firstname: findname?.first_name || "Unknown",
          lastname: findname?.last_name || "Unknown",
          room: student.room.room_id,
          time_enter: student.in_room || null,
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
    
      const roomLogs = await this.beaconLogRepository.find({
        where: { line_name_id: code },
      });
    
      if (!roomLogs.length) {
        return `No room logs found for student ${code}`;
      }
    
      const beacons = await this.beaconLogRepository.find();
    
      const result = roomLogs
        .map((log, index) => {
          const beacon = beacons.find((b) => b.room.room_id === log.room.room_id);
    
          return {
            id: index + 1,
            room: log.room.room_id,
            time_enter: beacon?.in_room || null,
          };
        });
    
      return result;
    }
    

  // async AddLog(createRoomLogDto: CreateRoomLogDto) {
  //   const roomLog = this.roomLogRepository.create(createRoomLogDto);
  //   return this.roomLogRepository.save(roomLog);
  // }


}
