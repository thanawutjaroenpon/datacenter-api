import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    email: string;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
}
    