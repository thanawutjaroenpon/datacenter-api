import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomLogDto } from './dto/create-room_log.dto';
import { UpdateRoomLogDto } from './dto/update-room_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
//import { RoomLog } from './entities/room_log.entity';
import { Repository } from 'typeorm';
import { UserInfo } from '../user_info/entities/user_info.entity';
import { RoomStatus } from '../room_status/entities/room_status.entity';
import { BeaconLog, UserProfile } from '../beacon_log/entities/beacon_log.entity';
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

    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async GetAdminLogRoom() {
    const beacons = await this.userProfileRepository.find();
    const rooms = await this.beaconLogRepository.find();
  
    //const students = await this.roomLogRepository.find();
  
    if (!beacons.length) {
      return `No students found`;
    }
  
    const result = await Promise.all(
      beacons.map(async (student, index) => {
        const findname = await this.userInfoRepository.findOne({
          where: { student_id:  student.displayname },
        });

        const findUserid = await this.beaconLogRepository.findOne({
          where: { userid: student.userid },
        });

        const findHwid = await this.roomStatusRepository.findOne({
          where: { hwid: findUserid.hwid },
        });

        const findRoom = await this.roomStatusRepository.findOne({
          where: { room_id: findHwid.room_id },
        });

        //const beacon = beacons.find((b) => b.Room_ID === student.Room_ID);
  
        return {
          id: index + 1,
          code: findname.student_id ,
          firstname: findname?.first_name || "Unknown",
          lastname: findname?.last_name || "Unknown",
          room: findRoom?.room_id || "Unknown",
          time_enter: findUserid.timestamp || null,
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
    
      const roomLogs = await this.userProfileRepository.find({
        where: { displayname: code },
      });
    
      if (!roomLogs.length) {
        return `No room logs found for student ${code}`;
      }
    
      const beacons = await this.beaconLogRepository.find();  

      const roomStatus =  await this.roomStatusRepository.find();
    
      const result = roomLogs
        .map((log, index) => {
          const beacon = beacons.find((b) => b.userid === log.userid);

          const findHwid = roomStatus.find((b) => b.hwid === beacon.hwid);

          const findRoom = roomStatus.find((b) => b.room_id === findHwid.room_id);
    
          return {
            id: index + 1,
            room: findRoom?.room_id || "Unknown",
            time_enter: beacon?.timestamp || null,
          };
        });
    
      return result;
    }
    

  // async AddLog(createRoomLogDto: CreateRoomLogDto) {
  //   const roomLog = this.roomLogRepository.create(createRoomLogDto);
  //   return this.roomLogRepository.save(roomLog);
  // }


}
