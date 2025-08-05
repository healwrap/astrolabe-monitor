import { Body, Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { AdminLoginDto, adminLoginSchema } from '../admin/admin.dto';
import { AdminService } from '../admin/admin.service';
import { AuthService } from './auth.service';

@ApiTags('认证')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService
  ) {}
  /**
   * 用户登录
   * 验证用户凭据并返回访问令牌
   */
  @ApiOperation({
    summary: '用户登录',
    description: '验证用户凭据并返回访问令牌',
  })
  @ResponseMessage('登录成功')
  @Post('login')
  @UsePipes(new ZodValidationPipe(adminLoginSchema))
  login(@Body() payload: AdminLoginDto) {
    return this.authService.login(payload);
  }

  /**
   * 用户退出登录
   * 退出当前用户登录状态
   */
  @ApiOperation({
    summary: '用户退出登录',
    description: '退出当前用户登录状态，使当前token失效',
  })
  @ResponseMessage('退出登录成功')
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.authService.logout(req.user.id, token);
  }
}
