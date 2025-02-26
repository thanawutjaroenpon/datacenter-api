import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('nfc_log')
export class NfcLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 8, nullable: true })
    Student_id: string;

    @Column({ length: 20, nullable: true })
    rooom_id: string;

    @Column()
    timestamp: Date;
}
