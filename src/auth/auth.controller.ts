import { Body, Controller, Post, Req } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  create(@Body() loginDto: LoginDTO) {
    return this.authService.singIn(loginDto);
  }
}
