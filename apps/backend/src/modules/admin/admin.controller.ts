import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { AdminRegisterDto, adminRegisterSchema } from './admin.dto';
import { AdminService } from './admin.service';

@ApiTags('管理员')
@Controller({
  path: 'admin',
  version: '1',
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({
    summary: '用户注册',
    description: '根据用户信息注册',
  })
  @ResponseMessage('注册成功')
  @UsePipes(new ZodValidationPipe(adminRegisterSchema))
  @Post('register')
  async register(@Body() payload: AdminRegisterDto) {
    return this.adminService.register(payload);
  }
}
