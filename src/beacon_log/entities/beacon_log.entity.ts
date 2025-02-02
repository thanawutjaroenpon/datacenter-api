import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoomStatus } from '../../room_status/entities/room_status.entity';

@Entity('beacon_log')
export class BeaconLog {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    ID_Beacon: string;

    @Column({ type: 'varchar', length: 20 })
    Line_ID: string;

    @Column({ type: 'varchar', length: 50 })
    Room_ID: string;

    @Column({ type: 'datetime' })
    in_room: Date;

    @Column({ type: 'datetime' })
    out_room: Date;

    @ManyToOne(() => RoomStatus, (room) => room.Room_ID, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'Room_ID' })
    room: RoomStatus;
}
