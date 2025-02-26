import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BeaconLog } from '../../beacon_log/entities/beacon_log.entity';


@Entity('room_status')
export class RoomStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: true })
    room_id: string;


    @Column({ length: 255 })
    hwid: string;

    @Column({nullable: true})
    door_no: number; 

    @Column({ length: 5, nullable: true })
    user_status: string;

    @Column({ length: 5, nullable: true })
    room_status: string;


    @OneToMany(() => BeaconLog, (beacon) => beacon.room)
    beacon: BeaconLog[];
}
