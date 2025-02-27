import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BeaconLog } from '../../beacon_log/entities/beacon_log.entity';

@Entity('room_status')
@Unique(['hwid']) // Add a unique constraint to the `hwid` column
export class RoomStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: true })
    room_id: string;

    @Column()
    hwid: string; // This column must be unique

    @Column({ nullable: true })
    door_no: number; 

    @Column({ length: 5, nullable: true })
    user_status: string;

    @Column({ length: 5, nullable: true })
    room_status: string;
    
    // @OneToMany(() => BeaconLog, beaconlog => beaconlog.roomStatus)
    // beaconlog: BeaconLog[];
}