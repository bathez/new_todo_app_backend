import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Public } from './core/guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  loginUser(@Request() req: any): any {
    console.log(req);
    console.log(this.config.get('DATABASE_URL'));
    const user: User = req.user;
    return this.authService.handleLogin(user);
  }

  @Public()
  @Post('create-account')
  createAccount(@Body() dto: User) {
    return this.authService.createAccount(dto);
  }
}
