import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局过滤器 - 处理异常响应
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局拦截器 - 包装成功响应
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

  // 设置 zod-nestjs 的 Swagger 支持
  patchNestjsSwagger();

  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('监控平台数据服务 API 文档')
    .setDescription('监控平台数据服务 API 文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // 路径 /doc
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`Swagger文档可在: ${await app.getUrl()}/doc 访问`);
  Logger.log(`API JSON可在: ${await app.getUrl()}/doc-json 访问`);
}
bootstrap();
