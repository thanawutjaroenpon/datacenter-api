import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('auth')
@ApiTags('Authorize')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('GetToken')
  getToken(): { token: string } {
    const token = this.authService.validateUser();
    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('HelloWorld')
  getHelloWorld(@Req() req: Request): string {
    return this.authService.getHelloWorld();
  }
}
