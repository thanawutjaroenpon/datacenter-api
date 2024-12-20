import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  
  constructor(private jwtService: JwtService) {}

  validateUser(): string {
    const username = 'admin';
    const password = 'admin';

    if (password === 'admin') {
      const user = { username: username };
      return this.jwtService.sign(user);
    }

    throw new Error('Invalid credentials');
  }

  getHelloWorld(): string {
    return 'Hello World!';
  }
}
