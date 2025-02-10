import typeorm from "src/config/typeorm";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Test2 {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string

}

