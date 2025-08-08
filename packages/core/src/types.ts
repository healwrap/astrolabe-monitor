import { BaseIntegration } from './integrations/baseIntegration';
import { Transport } from './transport';

/**
 * options
 * 监控相关配置
 */
export interface Options {
  dsn: string;
  transport: Transport;
  integrations: BaseIntegration[];
}
