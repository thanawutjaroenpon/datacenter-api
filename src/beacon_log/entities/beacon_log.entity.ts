import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn , PrimaryGeneratedColumn} from 'typeorm';
import { RoomStatus } from '../../room_status/entities/room_status.entity';

@Entity('beacon_log')
export class BeaconLog {
    @PrimaryGeneratedColumn()
    Beacon_Log_ID: number;

    @PrimaryColumn({ length: 255 })
    ID_Beacon: string;

    @Column({ length: 20 })
    Line_ID: string;

    @Column({ length: 50 })
    Room_ID: string;

    @Column()
    in_room: Date;

    @Column()
    out_room: Date;

    @ManyToOne(() => RoomStatus, (room) => room.Room_ID, {onDelete: 'CASCADE'})
    room: RoomStatus;
}
