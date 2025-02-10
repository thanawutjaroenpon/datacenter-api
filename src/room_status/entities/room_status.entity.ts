import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BeaconLog } from '../../beacon_log/entities/beacon_log.entity';


@Entity('room_status')
export class RoomStatus {
    @PrimaryGeneratedColumn()
    Room_Status_ID: number;

    @PrimaryColumn({ length: 50 })
    Room_ID: string;

    @Column()
    room_status: boolean; 

    @Column()
    item_status: boolean;

    @OneToMany(() => BeaconLog, (beacon) => beacon.room)
    beacon: BeaconLog[];
}
