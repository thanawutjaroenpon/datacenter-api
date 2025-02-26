import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BeaconLog } from '../../beacon_log/entities/beacon_log.entity';


@Entity('room_status')
export class RoomStatus {
    @PrimaryGeneratedColumn()
    Room_Status_ID: number;

    @PrimaryColumn({ length: 50 })
    room_id: string;

    @Column({nullable:true})
    room_status: boolean; 

    @Column({nullable:true})
    item_status: boolean;

    @OneToMany(() => BeaconLog, (beacon) => beacon.room)
    beacon: BeaconLog[];
}
