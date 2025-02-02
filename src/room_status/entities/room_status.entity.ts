import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BeaconLog } from 'src/beacon_log/entities/beacon_log.entity';

@Entity('room_status')
export class RoomStatus {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    Room_ID: string;

    @Column({ type: 'boolean' })
    room_status: boolean;

    @OneToMany(() => BeaconLog, (beacon) => beacon.room)
    beacon: BeaconLog[];
}
