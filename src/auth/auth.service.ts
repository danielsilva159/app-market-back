import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async singIn(login: LoginDTO) {
    const user = await this.userService.findEmail(login.email);
    if (!user) {
      throw new Error('email not found');
    }
    const validPassword = await bcrypt.compare(login.password, user.password);
    if (!validPassword) {
      throw new Error('invalid password');
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
