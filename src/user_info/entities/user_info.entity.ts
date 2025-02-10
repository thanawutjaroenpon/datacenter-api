import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 13 })
  id_card: string;

  @Column({ length: 8 })
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
  position: string;

  @Column({ length: 10 })
  teleiphone: string;

  @Column({ length: 6 })
  d_mm_y: string;

  @Column({ length: 5 })
  blood_group: string;

  @Column({ length: 50 })
  guardian_fname: string;

  @Column({ length: 50 })
  guardian_lname: string;

  @Column({ length: 10 })
  guardian_phone: string;

  @Column({ length: 255 })
  photograph: string; // File path
}

