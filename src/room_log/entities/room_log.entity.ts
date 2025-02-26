import { IsEnum } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export enum Status {
    IN = 'In',
    OUT = 'Out'
}

// @Entity('room_log')
// export class RoomLog {
//     @PrimaryGeneratedColumn()
//     Room_Log_ID: number;

//     @Column({ length: 50 })
//     Room_ID: string;

//     @Column({ length: 8})
//     Code: string;

//     @Column()
//     Time: Date;

//     @Column({nullable:true})
//     @IsEnum(Status)
//     Status: Status;

// }
