import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { nanoid } from 'nanoid';

import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { AdminEntity } from '../../entities/admin.entity';
import { ApplicationEntity } from '../../entities/application.entity';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import {
  CreateApplicationDto,
  createApplicationSchema,
  DeleteApplicationDto,
  deleteApplicationSchema,
  UpdateApplicationDto,
  updateApplicationSchema,
} from './application.dto';
import { ApplicationService } from './application.service';

@ApiTags('应用')
@Controller({
  path: 'application',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiOperation({
    summary: '创建应用',
    description: '根据应用信息创建新应用',
  })
  @ResponseMessage('创建成功')
  @Post()
  @UsePipes(new ZodValidationPipe(createApplicationSchema))
  async create(@Body() body: CreateApplicationDto, @Request() req) {
    const admin = new AdminEntity();
    admin.id = req.user.id;
    const application = new ApplicationEntity(body);
    Reflect.set<ApplicationEntity, 'appId'>(application, 'appId', application.type + nanoid(10));

    return await this.applicationService.create({ ...application, user: admin });
  }

  @ApiOperation({
    summary: '更新应用',
    description: '根据应用信息更新应用',
  })
  @ResponseMessage('更新成功')
  @Put()
  @UsePipes(new ZodValidationPipe(updateApplicationSchema))
  async update(@Body() body: UpdateApplicationDto, @Request() req) {
    const admin = new AdminEntity();
    admin.id = req.user.id;
    // 过滤掉 null 或 undefined 的字段
    const filteredBody = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(body).filter(([_, value]) => value !== null && value !== undefined)
    );
    const application = new ApplicationEntity(filteredBody);
    return await this.applicationService.update({ ...application, user: admin });
  }

  @ApiOperation({
    summary: '获取应用列表',
    description: '获取当前用户的应用列表',
  })
  @ResponseMessage('获取成功')
  @Get()
  async list(@Request() req) {
    return await this.applicationService.list({ userId: req.user.id });
  }

  @ApiOperation({
    summary: '删除应用',
    description: '根据应用ID删除应用',
  })
  @ResponseMessage('删除成功')
  @Delete()
  @UsePipes(new ZodValidationPipe(deleteApplicationSchema))
  async delete(@Body() body: DeleteApplicationDto, @Request() req) {
    return await this.applicationService.delete({
      appId: body.appId,
      userId: req.user.id,
    });
  }
}
