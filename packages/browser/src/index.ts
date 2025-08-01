import { Integration, Monitoring } from '@healwrap/monitor-sdk-core';

export { browserTracingIntegration } from './tracing/browserTracingIntegration';
export { ErrorsIntegration } from './tracing/errorsIntegration';

import { BrowserTransport } from './transport';

export { MetricsIntegration } from '@healwrap/monitor-sdk-browser-utils';

export function init(options: { dsn: string; integrations: Integration[] }) {
  const monitoring = new Monitoring({
    dsn: options.dsn,
    integrations: options.integrations,
  });

  const transport = new BrowserTransport(options.dsn);
  monitoring.init(transport);

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
