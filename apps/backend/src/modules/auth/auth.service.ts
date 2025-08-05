import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import * as crypto from 'crypto';
import Redis from 'ioredis';

import { parseTimeToSeconds } from '../../utils';
import { AdminLoginDto } from '../admin/admin.dto';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private configService: ConfigService,
    @InjectRedis() private readonly redis: Redis
  ) {}

  /**
   * 用户登录
   */
  async login(payload: AdminLoginDto) {
    const admin = await this.adminService.validateUser(payload.username, payload.password);
    if (!admin) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // token 中包含用户名和用户ID
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...ctx } = admin;
    const expiresIn = this.configService.get('jwt.expiresIn'); // 格式如 '24h'

    // 将时间字符串转换为秒数，用于 Redis
    const expiresInSeconds =
      typeof expiresIn === 'string' ? parseTimeToSeconds(expiresIn) : parseInt(expiresIn, 10);

    Logger.log(`JWT Token Expires In: ${expiresIn} (${expiresInSeconds} seconds)`);
    const token = this.jwtService.sign(ctx, { expiresIn });

    // 根据 jwt token 生成一个短hash，存入redis中
    const hash = crypto.createHash('md5').update(token).digest('hex');
    Logger.log(`JWT Token Hash: ${hash}`);
    // 有效的token
    // TODO 重复登录 会一直生成 记录，可能存在问题
    await this.redis.set(`token:${hash}`, admin.id, 'EX', expiresInSeconds);
    return {
      access_token: token,
    };
  }

  /**
   * 退出登录
   */
  async logout(userId: number, token: string) {
    // 先校验 token 是否有效，并拿到 hash
    const hash = await this.validateToken(userId, token);
    // 删除redis中的token
    await this.redis.del(`token:${hash}`);
    return true;
  }

  /**
   * 验证 token 是否有效
   */
  async validateToken(userId: number, token: string) {
    const hash = crypto.createHash('md5').update(token).digest('hex');
    const redisValue = await this.redis.get(`token:${hash}`);
    Logger.log(
      `验证 Token - UserId: ${userId}, Hash: ${hash}, Redis Value: ${redisValue}, Expected: ${userId.toString()}, Token: ${token}`
    );
    if (redisValue !== userId.toString()) {
      Logger.error(`Token 验证失败 - UserId: ${userId}, Hash: ${hash}, Redis Value: ${redisValue}`);
      throw new UnauthorizedException('Token 无效或已过期');
    }
    return hash;
  }
}
