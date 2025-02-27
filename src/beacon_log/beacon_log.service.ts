import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async findLastedTimeStampByUserIdAndHWid(userId: string, hwid: string): Promise<{ timestamp: Date } | null> {
    try {
      const latestBeaconLog = await this.beaconLogRepository.findOne({
        where: { hwid: hwid, userid: userId },
        order: { timestamp: 'DESC' },
      });
  
      if (!latestBeaconLog) {
        throw new NotFoundException('No beacon log found for the given userId and hwid.');
      }
  
      return { timestamp: latestBeaconLog.timestamp };
    } catch (error) {
      console.error('Error fetching Timestamp:', error);
      throw new HttpException(
        'Failed to find timestamp',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

    const beacon = this.beaconLogRepository.create({
      hwid: beacon_log.hwId,
      userid: beacon_log.userId,
      timestamp: new Date(beacon_log.timestamp),
    });
    await this.beaconLogRepository.save(beacon);

    return 'Beacon event created successfully';
  }

  async updateUserProfile(userId: string, displayName: string): Promise<string> {
    const result = await this.userProfileRepository.update(userId, { displayname: displayName });
  
    if (result.affected === 0) {
      throw new Error(`User with ID ${userId} not found.`);
    }
  
    return `User profile updated successfully for ID: ${userId} to display name: ${displayName}`;
  }  


}
