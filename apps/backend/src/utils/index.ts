/**
 * 将时间字符串转换为秒数
 * 支持的格式：
 * - 秒：'60s'
 * - 分钟：'60m'
 * - 小时：'24h'
 * - 天：'7d'
 */
export function parseTimeToSeconds(time: string): number {
  const unit = time.slice(-1);
  const value = parseInt(time.slice(0, -1), 10);

  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 24 * 60 * 60;
    default:
      return parseInt(time, 10);
  }
}
