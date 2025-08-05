import { registerAs } from '@nestjs/config';

export default registerAs('clickhouse', () => ({
  url: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
  username: process.env.CLICKHOUSE_USER || 'default',
  password: process.env.CLICKHOUSE_PASSWORD || 'healwrap',
}));
