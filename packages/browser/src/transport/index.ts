import { type Transport } from '@healwrap/monitor-sdk-core';

export class BrowserTransport implements Transport {
  constructor(private dsn: string) {}

  send(data: Record<string, unknown>) {
    // TODO 可以做一个 适配器，选择性使用 XHR 或者 fetch
    fetch(this.dsn, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(err => console.error('Failed to send data', err));
  }
}
