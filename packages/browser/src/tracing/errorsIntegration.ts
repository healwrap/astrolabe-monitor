import { BaseIntegration, Options } from '@healwrap/monitor-sdk-core';

import { IntegrationOptions } from '../types';

/**
 * 错误处理集成
 */
export class ErrorsIntegration extends BaseIntegration {
  constructor(integrationOptions: IntegrationOptions = {}) {
    super(integrationOptions);
  }

  /**
   * 设置方法
   * 实现错误处理的具体逻辑
   * @param options 合并后的选项
   */
  protected setup(options: Options & IntegrationOptions): void {
    const { transport } = options;
    // 捕获全局错误

    window.onerror = (message, source, lineno, colno, error) => {
      transport.send({
        type: 'error',
        message: message,
        // 根据配置决定是否发送更多信息
        source,
        lineno,
        colno,
        stack: error ? error.stack : undefined,
        path: window.location.pathname,
      });
    };

    // 捕获未处理的 Promise reject
    window.onunhandledrejection = event => {
      transport.send({
        type: 'unhandledrejection',
        message: event.reason,
        path: window.location.pathname,
      });
    };

    // TODO 捕获 console 错误，容易死循环，不做
  }
}
