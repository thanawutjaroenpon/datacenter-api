import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username:string
    @Column()
    password:string
    @Column({ default: 'user' })  
    role: string;
}
