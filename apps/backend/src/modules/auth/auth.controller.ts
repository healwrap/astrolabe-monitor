import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { AdminLoginDto, adminLoginSchema } from '../admin/admin.dto';
import { AuthService } from './auth.service';

@ApiTags('认证')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
  @HttpCode(HttpStatus.OK)
  login(@Body() payload: AdminLoginDto) {
    return this.authService.login(payload);
  }
}
