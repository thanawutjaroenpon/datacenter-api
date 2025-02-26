import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn , PrimaryGeneratedColumn} from 'typeorm';
import { RoomStatus } from '../../room_status/entities/room_status.entity';
import { userInfo } from 'os';
import { UserInfo } from '../../user_info/entities/user_info.entity';

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
    @PrimaryColumn()
    userid: string;

    @Column({ length: 100, nullable: true })
    displayname: string;

    @OneToOne(() => UserInfo, userInfo => userInfo.user_line_id)
    @JoinColumn({ name: 'userid' })
    userInfo: UserInfo; 
}
