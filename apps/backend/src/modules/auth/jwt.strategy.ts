import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AdminEntity } from '../../entities/admin.entity';
import { AdminService } from '../admin/admin.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private adminService: AdminService,
    private authService: AuthService,
    @InjectRedis() private readonly redis: Redis
  ) {
    super({
      // bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
      passReqToCallback: true, // 将请求对象传递给回调
    });
  }

  async validate(req: any, payload: Omit<AdminEntity, 'password'>) {
    await this.authService.validateToken(
      payload.id,
      req.headers.authorization.replace('Bearer ', '')
    );
    return await this.adminService.findById(payload.id);
  }
}
