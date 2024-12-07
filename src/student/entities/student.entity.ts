import { Entity ,Column, PrimaryGeneratedColumn } from "typeorm";

 @Entity()
 export class Student {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    academic:number



}
