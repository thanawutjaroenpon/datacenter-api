import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {
  
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private AuthRepository: Repository<Auth>,
  ) {}

  validateUser(): string {
    const username = 'admin';
    const password = 'admin';
    const role = 'admin';

    if (password === 'admin') {
      const user = { username: username , role:role};
      const token = this.jwtService.sign(user);
      //console.log('Generated Token:', token);
      return token;
    }
    throw new Error('Invalid credentials');
  }

  async getUser(){
    const user = this.AuthRepository.find()
    return user
  }
  async findOneByUsername(username: string) {
    return await this.AuthRepository.findOne({ where: { username } });
  }

  async register(username: string, password: string, role: string = 'user') {
    const existingUser = await this.AuthRepository.findOne({ where: { username } });
    
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await argon2.hash(password);
    
    const newUser = this.AuthRepository.create({
      username,
      password: hashedPassword,
      role
    });

    await this.AuthRepository.save(newUser);

    const token = await this.validateUserv2(username, password);

    return { access_token: token , message: 'User registered successfully' };
  }


  async login(username: string, password: string) {
    const token = await this.validateUserv2(username, password);
    return { access_token: token };
  }


  async validateUserv2(username: string, password: string): Promise<string> {
    const user = await this.AuthRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('wrong username or password');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('wrong username or password');
    }

    const payload = { username: user.username, role: user.role };
    return this.jwtService.sign(payload);
  }
  
  getHelloWorld(): string {
    return 'Hello World!';
  }
}
