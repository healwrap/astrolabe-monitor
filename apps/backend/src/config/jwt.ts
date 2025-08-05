import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'healwrap',
  // token 过期时间设置为 24 小时
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  // Redis 中黑名单的过期时间应该稍微长一点，比如比 JWT 过期时间多 1 小时
  // 这样可以确保即使有时间偏差，黑名单依然有效
  blacklistTTL: parseInt(process.env.JWT_BLACKLIST_TTL, 10) || 25 * 60 * 60, // 25 小时，单位：秒
}));
