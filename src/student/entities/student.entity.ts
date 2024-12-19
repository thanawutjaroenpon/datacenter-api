import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    code: string;
    @Column()
    firstname: string;
    @Column()
    lastname: string;

    
}
