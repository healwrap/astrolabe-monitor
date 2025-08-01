import { Transport } from './transport';
import { MonitoringOptions } from './types';

export class Monitoring {
  private transport: Transport | null = null;

  constructor(private options: MonitoringOptions) {}

  init(transport: Transport) {
    this.transport = transport;
    this.options.integrations.forEach(integration => {
      integration.init(transport);
    });
  }

  // 自定义上报消息
  reportMessage(message: string) {
    this.transport?.send({ type: 'message', message });
  }

  // 自定义上报事件
  reportEvent(event: unknown) {
    this.transport?.send({ type: 'event', event });
  }
}
