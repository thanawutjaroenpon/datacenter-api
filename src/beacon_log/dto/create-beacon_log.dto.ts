import { IsString, IsDateString, isDateString } from "class-validator";

export class CreateUserProfileDto {
    userId: string;
    displayname?: string;
  }
  
  export class CreateBeaconLogDto {
    hwId: string;
    userId: string;
    timestamp: Date;
  }
  
  export class CreateBeaconEventDto {
    user_profile: CreateUserProfileDto;
    beacon_log: CreateBeaconLogDto;
  }
  
