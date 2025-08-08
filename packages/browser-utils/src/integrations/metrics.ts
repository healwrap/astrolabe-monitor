import { BaseIntegration, Options } from '@healwrap/monitor-sdk-core';

import { onCLS, onFCP, onLCP, onTTFB } from '../metrics/web-vitals';
import { IntegrationOptions } from '../types';
// import { getBrowserInfo } from '../utils/index';

// TODO 单独发送
export class MetricsIntegration extends BaseIntegration {
  constructor(integrationOptions: IntegrationOptions = {}) {
    super(integrationOptions);
  }

  protected setup(options: Options & IntegrationOptions) {
    const { transport } = options;
    [onCLS, onLCP, onFCP, onTTFB].forEach(metricFn => {
      metricFn(metric => {
        transport.send({
          type: 'webVital',
          name: metric.name,
          value: metric.value,
          path: window.location.pathname,
        });
      });
    });
  }
}

// // TODO 整合发送
// interface Metric {
//   name: string;
//   value: number;
//   rating?: string;
// }

// export class MetricsIntegration {
//   constructor(private transport: Transport) {}

//   init(transport: Transport) {
//     this.transport = transport;
//     this.collectAndSendMetrics();
//   }

//   private async collectAndSendMetrics() {
//     try {
//       const metricsPromises = [
//         this.getMetricPromise(onCLS, 'CLS'),
//         this.getMetricPromise(onLCP, 'LCP'),
//         this.getMetricPromise(onFCP, 'FCP'),
//         this.getMetricPromise(onTTFB, 'TTFB'),
//       ];

//       const metrics = await Promise.all(metricsPromises);
//       const browserInfo = getBrowserInfo();

//       // 整合所有指标数据
//       const metricsData = metrics.reduce(
//         (acc, metric) => {
//           if (metric) {
//             acc[metric.name] = {
//               value: metric.value,
//               rating: metric.rating || 'unknown',
//             };
//           }
//           return acc;
//         },
//         {} as Record<string, { value: number; rating: string }>
//       );

//       // 一次性发送所有指标数据
//       this.transport.send({
//         type: 'webVital',
//         metrics: metricsData,
//         browserInfo,
//         path: window.location.pathname,
//         timestamp: Date.now(),
//       });
//     } catch (error) {
//       console.error('Failed to collect metrics:', error);
//     }
//   }

//   private getMetricPromise(
//     metricFn: (callback: (metric: Metric) => void) => void,
//     metricName: string
//   ): Promise<Metric | null> {
//     return new Promise(resolve => {
//       const timeout = setTimeout(() => {
//         console.warn(`Metric ${metricName} collection timed out`);
//         resolve(null);
//       }, 5000); // 5秒超时

//       metricFn((metric: Metric) => {
//         clearTimeout(timeout);
//         resolve(metric);
//       });
//     });
//   }
// }
