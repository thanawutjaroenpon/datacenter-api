import { IsEnum } from "class-validator";
import { Auth } from "src/auth/entities/auth.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Position {
  Student = 'Student',
  Teacher = 'Teacher',
  Admin = 'Admin'
}
@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 13, unique: true })
  id_card: string;

  @Column({ length: 8, unique: true })
  student_id: string;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ length: 10 })
  nick_name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column({ length: 32 })
  token_id: string;

  @Column({ length: 20 })
  line_id: string;

  @Column({ length: 10 })
  teleiphone: string;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ length: 5 })
  blood_group: string;

  @Column({ length: 50 })
  guardian_fname: string;

  @Column({ length: 50 })
  guardian_lname: string;

  @Column({ length: 10 })
  guardian_phone: string;

  @Column({ nullable: true })
  photograph: string; // base64

  @Column({ nullable: true })
  nfc_id: string
  @Column({ nullable: true })
  pin: string

  @Column({ default:Position.Student })
  @IsEnum(Position)
  Position: Position;


  @OneToOne(() => Auth, auth => auth.userInfo)
  auth: Auth; // Relation back to Auth
}

