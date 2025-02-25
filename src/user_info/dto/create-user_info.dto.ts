import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { position } from '../entities/user_info.entity';
export class CreateUserInfoDto {
    
    @IsNotEmpty({ message: 'id_card cannot be empty' })
    @IsString({ message: 'id_card must be a string' })

    id_card: string;

    @IsNotEmpty({ message: 'student_id cannot be empty' })
    @IsString({ message: 'student_id must be a string' })

    student_id: string;

    @IsNotEmpty({ message: 'first_name cannot be empty' })
    @IsString({ message: 'first_name must be a string' })

    first_name: string;

    @IsNotEmpty({ message: 'last_name cannot be empty' })
    @IsString({ message: 'last_name must be a string' })

    last_name: string;

    @IsNotEmpty({ message: 'nick_name cannot be empty' })
    @IsString({ message: 'nick_name must be a string' })

    nick_name: string;

    @IsNotEmpty({ message: 'email cannot be empty' })
    @IsString({ message: 'email must be a string' })

    email: string;

    @IsNotEmpty({ message: 'password cannot be empty' })
    @IsString({ message: 'password must be a string' })

    password: string;

    @IsNotEmpty({ message: 'token_id cannot be empty' })
    @IsString({ message: 'token_id must be a string' })

    token_id: string;

    @IsNotEmpty({ message: 'line_id cannot be empty' })
    @IsString({ message: 'line_id must be a string' })

    line_id: string;

    @IsNotEmpty({ message: 'user_line_id cannot be empty' })
    @IsString({ message: 'user_line_id must be a string' })
    
    user_line_id: string;

    @IsNotEmpty({ message: 'position cannot be empty' })
    @IsEnum(position, { message: 'position must be a valid enum value' })
    position: position;

    @IsNotEmpty({ message: 'tel cannot be empty' })
    @IsString({ message: 'tel must be a string' })
    
    teleiphone: string;

    @IsNotEmpty({ message: 'date_of_birth cannot be empty' })
    @IsDateString({}, { message: 'date_of_birth must be a valid date string' })
    date_of_birth: string;

    @IsNotEmpty({ message: 'blood_group cannot be empty' })
    @IsString({ message: 'blood_group must be a string' })

    blood_group: string;

    @IsNotEmpty({ message: 'guardian_fname cannot be empty' })
    @IsString({ message: 'guardian_fname must be a string' })

    guardian_fname: string;

    @IsNotEmpty({ message: 'guardian_lname cannot be empty' })
    @IsString({ message: 'guardian_lname must be a string' })

    guardian_lname: string;

    @IsNotEmpty({ message: 'guardian_phone cannot be empty' })
    @IsString({ message: 'guardian_phone must be a string' })

    guardian_phone: string;

    @IsNotEmpty({ message: 'NFC cannot be empty' })
    @IsString({ message: 'NFC must be a string' })

    nfc_id: string;

    @IsNotEmpty({ message: 'pin cannot be empty' })
    @IsString({ message: 'pin must be a string' })

    pin: string;

    @IsNotEmpty({ message: 'photograph cannot be empty' })
    @IsString({ message: 'photograph must be a string' })
    photograph: string;
}
