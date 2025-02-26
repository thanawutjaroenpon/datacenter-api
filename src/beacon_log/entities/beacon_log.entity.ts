import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn , PrimaryGeneratedColumn} from 'typeorm';
import { RoomStatus } from '../../room_status/entities/room_status.entity';
import { userInfo } from 'os';
import { UserInfo } from '../../user_info/entities/user_info.entity';
import { join } from 'path';
@Entity('user_profile')
export class UserProfile {
    @PrimaryColumn()
    userid: string;

    @Column({ length: 100, nullable: true })
    displayname: string;

    // @OneToOne(() => UserInfo, userInfo => userInfo.user_line_id)
    // @JoinColumn({ name: 'userid' })
    // userInfo: UserInfo; 

    // @OneToMany(() => BeaconLog, (beaconlog) => beaconlog.userid)
    // beaconlog: BeaconLog[];
    
}
@Entity('beacon_log')
export class BeaconLog {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    hwid: string;

    @Column({ nullable: true })
    userid: string;

    @Column()
    timestamp: Date;

    // @ManyToOne(() => UserProfile, userprofile => userprofile.userid)
    // @JoinColumn({name:'userid'})
    // userprofile: UserProfile;
    
    // @ManyToOne(() => RoomStatus, roomStatus => roomStatus.beaconlog)
    // @JoinColumn({ name: 'hwid', referencedColumnName: 'hwid' })  // Use 'hwid' as the foreign key
    // roomStatus: RoomStatus;
}


