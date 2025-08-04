import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { AdminEntity } from '../../entities/admin.entity';
import { AdminRegisterDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ) {}

  /**
   * 校验用户是否存在，用户jwt校验，和登录校验
   */
  async validateUser(username: string, password: string) {
    const admin = await this.adminRepository.findOne({
      where: { username },
    });
    if (!admin) {
      throw new UnauthorizedException('用户名不存在');
    }
    // 请求中的密码和数据库中的hash对比
    if (!bcrypt.compareSync(password, admin?.password)) {
      throw new UnauthorizedException('用户名密码错误');
    }
    return admin;
  }

  /**
   * 根据ID查找用户
   */
  async findById(id: number) {
    const admin = await this.adminRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'phone', 'role'],
    });
    if (!admin) {
      throw new UnauthorizedException('用户不存在');
    }
    return admin;
  }

  /**
   * 注册新用户
   */
  async register(payload: AdminRegisterDto) {
    const adminIsExist = await this.adminRepository.findOne({
      where: { username: payload.username },
    });
    if (adminIsExist) {
      throw new BadRequestException('用户已存在');
    }
    // 加密密码
    payload.password = await bcrypt.hash(payload.password, 10);
    const admin = await this.adminRepository.create(payload);
    return !!(await this.adminRepository.save(admin));
  }
}
