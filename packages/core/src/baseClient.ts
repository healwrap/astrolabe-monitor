import { Options } from './types';

export class Monitoring {
  constructor(private options: Options) {}

  init() {
    this.options.integrations.forEach(integration => {
      integration.init(this.options);
    });
  }

  // 自定义上报消息
  reportMessage(message: string) {
    this.options.transport?.send({ type: 'message', message });
  }

  // 自定义上报事件
  reportEvent(event: unknown) {
    this.options.transport?.send({ type: 'event', event });
  }
}
