import { IsString, IsDateString, isDateString } from "class-validator";

export class CreateBeaconLogDto {

    @IsString()
    ID_Beacon: string;

    @IsString()
    Line_ID: string;

    @IsString()
    Room_ID: string;

    @IsDateString()
    in_room: Date;

    @IsDateString()
    out_room: Date;
   
}
