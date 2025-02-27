import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateNfcLogDto {
    @IsOptional()
    @IsString()
    student_id?: string;

    @IsOptional()
    @IsString()
    room_id?: string;

    // @IsDate()
    // timestamp: Date;
}
