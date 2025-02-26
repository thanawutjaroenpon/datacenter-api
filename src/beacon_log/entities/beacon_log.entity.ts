import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn , PrimaryGeneratedColumn} from 'typeorm';
import { RoomStatus } from '../../room_status/entities/room_status.entity';

@Entity('beacon_log')
export class BeaconLog {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({ length: 255 })
    hwid: string;

    @Column({ length: 20, nullable: true })
    userid: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => RoomStatus, (room) => room.hwid, {onDelete: 'CASCADE'})
    room: RoomStatus;
}

@Entity('user_profile')
export class UserProfile {
    @PrimaryColumn({ length: 50 })
    userid: string;

    @Column({ length: 100, nullable: true })
    displayname: string;
}
