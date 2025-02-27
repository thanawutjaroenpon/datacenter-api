import { Column, Entity, PrimaryGeneratedColumn, ViewEntity } from "typeorm";

@Entity({ name: 'room_entry_method' })
export class RoomEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entry_time: string;
  
    @Column()
    room_id: string;
  
    @Column()
    student_id: string;
  
    @Column()
    first_name: string;
  
    @Column()
    position: string;
  
    @Column()
    entry_method: string;}


