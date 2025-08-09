export * from '@healwrap/monitor-sdk-browser';

import { BrowserTransport } from '@healwrap/monitor-sdk-browser';
import { Monitoring, Options } from '@healwrap/monitor-sdk-core';

export { VueIntegration } from './integrations';

export function init(options: Omit<Options, 'transport'>) {
  // TODO 使用 浏览器的 Transport 发送消息，后续考虑封装 axios 或者其他 http 库
  const transport = new BrowserTransport(options.dsn);
  const monitoring = new Monitoring({
    dsn: options.dsn,
    integrations: options.integrations,
    transport,
  });
  monitoring.init();

  return monitoring;
}
