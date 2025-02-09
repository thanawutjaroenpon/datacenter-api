import { Injectable } from '@nestjs/common';
import { CreateRoomStatusDto } from './dto/create-room_status.dto';
import { UpdateRoomStatusDto } from './dto/update-room_status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomStatus } from './entities/room_status.entity';
import { In, Not, LessThan, Repository } from 'typeorm';
import { UserInfo } from 'src/user_info/entities/user_info.entity';
import { RoomLog, Status } from 'src/room_log/entities/room_log.entity';

@Injectable()
export class RoomStatusService {
  constructor(
    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    
    @InjectRepository(RoomLog)
    private roomLogRepository: Repository<RoomLog>,

  ) {}
 
 async GetAllRoomsStatus(): Promise<RoomStatus[]> {
    return await this.roomStatusRepository.find();
  }


  async GetMemberInRoom(id: string) {
    const Room = await this.roomStatusRepository.findOne({ where: { Room_ID: id } });

    if (!Room) {
        return `Room ${id} not found`;
    }

    const latestLogs = await this.roomLogRepository
      .createQueryBuilder("log")
      .select("log.*")
      .where("log.Room_ID = :roomId", { roomId: id })
      .andWhere(`log."Time" = (SELECT MAX(sub."Time") FROM room_log sub WHERE sub."Code" = log."Code")`)
      .getRawMany();


    if (!latestLogs.length) {
        return `No active members found in Room ${id}`;
    }

    const activeLogs = latestLogs.filter((log) => log.Status.toLowerCase() === Status.IN.toLowerCase());

    if (!activeLogs.length) {
        return `No active members found in Room ${id}`;
    }

    const uniqueCodes = activeLogs.map((log) => log.Code);

    const findMembers = await this.userInfoRepository.find({
        where: { student_id: In(uniqueCodes) },
    });

    const result = findMembers.map((member) => ({
        firstname: member.first_name,
        lastname: member.last_name,
        code: member.student_id,
    }));

    return result;
}

  

}
