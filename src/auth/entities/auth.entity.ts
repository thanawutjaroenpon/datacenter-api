import { UserInfo } from '../../user_info/entities/user_info.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable:true})
    id_card:string; 
    @Column({unique:true})
    username:string
    @Column()
    password:string
    @Column({ default: 'user' })  
    role: string;

    @OneToOne(() => UserInfo, userInfo => userInfo.auth)
    @JoinColumn({ name: 'id_card', referencedColumnName: 'id_card' })
    userInfo: UserInfo; 
}
