import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherDto {
    @IsNotEmpty({ message: 'email cannot be empty' })
    @IsString({ message: 'email must be a string' })
    @IsEmail({},{ message: 'email must be a valid email' })
    email: string;
    @IsNotEmpty({ message: 'Firstname cannot be empty' })
    @IsString({ message: 'Firstname must be a string' })
    firstname: string;
    @IsNotEmpty({ message: 'Lastname cannot be empty' })
    @IsString({ message: 'Lastname must be a string' })
    lastname: string;
    }   

