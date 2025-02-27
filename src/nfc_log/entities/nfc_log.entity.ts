import { UserInfo } from "src/user_info/entities/user_info.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('nfc_log')
export class NfcLog {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    student_id: string; // This should match the type of `student_id` in UserInfo

    @Column({ length: 20, nullable: true })
    room_id: string; // Fixed typo: 'rooom_id' -> 'room_id'

    @Column()
    timestamp: Date;

    // @ManyToOne(() => UserInfo, (userInfo) => userInfo.student_id)
    // @JoinColumn({ name: 'student_id', referencedColumnName: 'student_id' }) // Reference 'student_id' in UserInfo
    // userInfo: UserInfo;
}