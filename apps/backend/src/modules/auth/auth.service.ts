import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminLoginDto } from '../admin/admin.dto';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService
  ) {}

  async login(payload: AdminLoginDto) {
    const admin = await this.adminService.validateUser(payload.username, payload.password);
    if (!admin) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    // token 中包含用户名和用户ID
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...ctx } = admin;
    return {
      access_token: this.jwtService.sign(ctx),
    };
  }
}
