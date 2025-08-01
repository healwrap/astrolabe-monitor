import { type Transport } from '@healwrap/monitor-sdk-core';

/**
 * 错误处理
 */
export class ErrorsIntegration {
  constructor(private transport: Transport) {}

  init(transport: Transport) {
    this.transport = transport;

    // 捕获全局错误
    window.onerror = (message, source, lineno, colno, error) => {
      this.transport.send({
        type: 'error',
        message: message,
        source,
        lineno,
        colno,
        error: error ? error.stack : undefined,
        path: window.location.pathname,
      });
    };

    // 捕获未处理的 Promise reject
    window.onunhandledrejection = event => {
      this.transport.send({
        type: 'unhandledrejection',
        message: event.reason,
        path: window.location.pathname,
      });
    };

    // TODO 捕获 console 错误，容易死循环，不做
  }
}
