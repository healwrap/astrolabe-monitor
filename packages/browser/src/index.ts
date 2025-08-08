import { Monitoring, Options } from '@healwrap/monitor-sdk-core';

export { browserTracingIntegration } from './tracing/browserTracingIntegration';
export { ErrorsIntegration } from './tracing/errorsIntegration';
import { BrowserTransport } from './transport';
// TODO 导出 BrowserTransport，正常情况不应该导出，而是根据平台自行封装 Transport
export { BrowserTransport } from './transport';
export { MetricsIntegration } from '@healwrap/monitor-sdk-browser-utils';
export type { IntegrationOptions } from './types';

export function init(options: Omit<Options, 'transport'>) {
  const transport = new BrowserTransport(options.dsn);
  const monitoring = new Monitoring({
    dsn: options.dsn,
    transport,
    integrations: options.integrations,
  });

  monitoring.init();

  return monitoring;
}

/**
 * 使用示例：
 *
 * import { init, Errors, Metrics } from '@healwrap/monitor-sdk-browser'
 *
 * const monitoring = init({
 *    dsn: 'http://localhost:8080/api/v1/monitoring/reactRqL9vG',
 *   integrations: [new Errors(), new Metrics()],
 * })
 */
