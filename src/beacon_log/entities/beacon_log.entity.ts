import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn , PrimaryGeneratedColumn} from 'typeorm';
import { RoomStatus } from '../../room_status/entities/room_status.entity';

@Entity('beacon_log')
export class BeaconLog {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({ length: 255 })
    id_beacon: string;

    @Column({ length: 20, nullable: true })
    user_line_id: string;

    @Column({ length: 20, nullable: true })
    line_name_id: string;

    @Column()
    in_room: Date;

    @ManyToOne(() => RoomStatus, (room) => room.id_beacon, {onDelete: 'CASCADE'})
    room: RoomStatus;
}
