import { IsNotEmpty, IsString } from 'class-validator';
export class CreateStudentDto {
    
    @IsNotEmpty({ message: 'Code cannot be empty' })
    @IsString({ message: 'Code must be a string' })
    code: string;

    @IsNotEmpty({ message: 'Firstname cannot be empty' })
    @IsString({ message: 'Firstname must be a string' })
    firstname: string;

    @IsNotEmpty({ message: 'Lastname cannot be empty' })
    @IsString({ message: 'Lastname must be a string' })
    lastname: string;
}
