import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';

import { ClickhouseModule } from './basement/clickhouse/clickhouse.module';
import clickhouseConfig from './config/clickhouse';
import databaseConfig from './config/database';
import jwtConfig from './config/jwt';
import redisConfig from './config/redis';
import { AdminModule } from './modules/admin/admin.module';
import { ApplicationModule } from './modules/application/application.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, redisConfig, clickhouseConfig, jwtConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    // postgres 配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return config.get('database');
      },
      inject: [ConfigService],
    }),
    // Redis 缓存配置
    RedisModule.forRoot({
      type: 'single',
      options: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || 'healwrap',
      },
    }),
    // clickhouse 配置
    ClickhouseModule.forRoot({
      url: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
      username: process.env.CLICKHOUSE_USER || 'default',
      password: process.env.CLICKHOUSE_PASSWORD || 'healwrap',
    }),
    AuthModule,
    AdminModule,
    ApplicationModule,
  ],
})
export class AppModule {}
