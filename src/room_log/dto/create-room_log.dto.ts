import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Status } from "../entities/room_log.entity";

export class CreateRoomLogDto {

    @IsString()
    @IsNotEmpty()
    Room_ID: string;

    @IsNumber()
    @IsNotEmpty()
    code: number;

    @IsDate()
    @IsNotEmpty()
    Time: Date;

    @IsEnum(Status)
    @IsNotEmpty()
    Status: Status;
}
