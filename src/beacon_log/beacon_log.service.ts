import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeaconEventDto, CreateBeaconLogDto } from './dto/create-beacon_log.dto';
import { UpdateBeaconLogDto } from './dto/update-beacon_log.dto';
import { BeaconLog, UserProfile } from './entities/beacon_log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { RoomStatus } from '../room_status/entities/room_status.entity';
import { UserInfo } from '../user_info/entities/user_info.entity';

@Injectable()
export class BeaconLogService {

  constructor(
    @InjectRepository(BeaconLog)
    private beaconLogRepository: Repository<BeaconLog>,

    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,

    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>
  ) {}

  

  // async create(createBeaconLogDto: CreateBeaconLogDto): Promise<BeaconLog> {
  //   return await this.beaconLogRepository.save(createBeaconLogDto);
  // }

  async GetBeaconLog(): Promise<BeaconLog[]> {
    return await this.beaconLogRepository.find();
  }

  // async GetBeaconByUserId(userId: string): Promise<UserInfo[]> {
  //   const user = await this.userProfileRepository.findOne({ where: { userid: userId } });
    
  //   return await this.userInfoRepository.find({ where: { user_line_id: user.userid } });
  // }

  async findUserProfileBuUserId(userId: string): Promise<UserProfile> {
    return await this.userProfileRepository.findOne({ where: { userid: userId } });
  }

  async findLastedTimeStampByUserIdAndHWid(userId: string, hwid: string): Promise<{ timestamp: Date } | string[]> {
    
      if (!hwid || !userId) {
        return []; // Return empty array if hwid or userId is missing
      }

      const latestBeaconLog = await this.beaconLogRepository.findOne({
        where: { hwid, userid: userId },
        order: { timestamp: 'DESC' },
      });

      if (!latestBeaconLog) {
        return []; // Return empty array if no beacon log found
      }

      return { timestamp: latestBeaconLog.timestamp };
    
}

  async GetRooms(): Promise<{ timestamp: Date; room: string | null }[]> {
    try {
      const beaconLogs = await this.beaconLogRepository.find({
        select: ['timestamp', 'hwid'],
      });
  
      if (!beaconLogs.length) {
        throw new Error('No beacon logs found.');
      }
  
      const hwids = beaconLogs.map((log) => log.hwid);
  
      const roomStatuses = await this.roomStatusRepository.find({
        where: { hwid: In(hwids) }, 
        select: ['hwid', 'room_id'],
      });
  
      const hwidToRoomMap = new Map(roomStatuses.map((room) => [room.hwid, room.room_id]));
  
      return beaconLogs.map((log) => ({
        timestamp: log.timestamp,
        room: hwidToRoomMap.get(log.hwid) || null, 
      }));
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw new HttpException(
        'Failed to fetch room data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }  

  //for beacon
  async findUserProfile(): Promise<UserProfile[]> {
    return await this.userProfileRepository.find({
      where: { displayname: Not(IsNull()) },
    });
  }


  async createBeaconEvent(dto: CreateBeaconEventDto): Promise<string> {
    const { user_profile, beacon_log } = dto;

    let user = await this.userProfileRepository.findOne({ where: { userid: user_profile.userId } });    
    if (!user) {
      user = this.userProfileRepository.create({
        userid: user_profile.userId,
        displayname: user_profile.displayname,
      });
      await this.userProfileRepository.save(user);
    }

    const now = new Date();
    const formattedTimestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
                               `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;


    const beacon = this.beaconLogRepository.create({
      hwid: beacon_log.hwId,
      userid: beacon_log.userId,
      timestamp: formattedTimestamp,
      
    });

    await this.beaconLogRepository.save(beacon);

    const userInfo = await this.userInfoRepository.findOne({ where: { student_id: user.displayname } });

    if (userInfo) {
      if (!userInfo.user_line_id || userInfo.user_line_id !== user.userid) {
          await this.userInfoRepository.update(userInfo.id, { user_line_id: user.userid });
      }
  }

    return 'Beacon event created successfully';
  }

  async createBeaconLog(createBeaconLogDto: CreateBeaconLogDto): Promise<string> {
    if (!createBeaconLogDto.hwId) {
      throw new BadRequestException('hwId (hwid) is required');
    }

    const now = new Date();
    const formattedTimestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
                               `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const beaconLog = this.beaconLogRepository.create({
      hwid: createBeaconLogDto.hwId,  // Explicit mapping
      userid: createBeaconLogDto.userId,
      timestamp: formattedTimestamp,
    });

    await this.beaconLogRepository.save(beaconLog);
    return 'Beacon log created successfully';
}


async updateUserProfile(userId: string, displayName: string): Promise<string> {
  const result = await this.userProfileRepository.update(userId, { displayname: displayName });

  if (result.affected === 0) {
      throw new Error(`User with ID ${userId} not found.`);
  }

  const userInfo = await this.userInfoRepository.findOne({ where: { student_id: displayName } });

  if (userInfo) {
      if (!userInfo.user_line_id || userInfo.user_line_id !== userId) {
          await this.userInfoRepository.update(userInfo.id, { user_line_id: userId });
      }
  }

  return `User profile updated successfully for ID: ${userId} to display name: ${displayName}`;
}



}
