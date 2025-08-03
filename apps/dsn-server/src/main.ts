import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('监控平台 SDK API 文档')
    .setDescription('监控平台 SDK API 文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // 路径 /doc
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
