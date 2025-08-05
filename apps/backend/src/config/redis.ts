import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  type: 'single',
  // url: `redis://${process.env.REDIS_HOST || 'localhost'}:${parseInt(process.env.REDIS_PORT, 10) || 6379}`,
  url: `redis://127.0.0.1:6379`,
  password: process.env.REDIS_PASSWORD || '',
  db: parseInt(process.env.REDIS_DB, 10) || 0,
  ttl: parseInt(process.env.REDIS_TTL, 10) || 5000,
}));
