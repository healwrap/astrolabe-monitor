import { ErrorsIntegration, init, MetricsIntegration } from '@healwrap/monitor-sdk-browser';

// import { browserTracingIntegration, feedbackIntegration, init } from '@sentry/browser';

// init({
//   dsn: 'https://9736628f5acf31ca201520b62810de24@o4509746917801984.ingest.us.sentry.io/4509746922979328',
//   // Setting this option to true will send default PII data to Sentry.
//   // For example, automatic IP address collection on events
//   sendDefaultPii: true,
//   integrations: [browserTracingIntegration(), feedbackIntegration()],
//   tracesSampleRate: 1.0,
// });

const monitor = init({
  dsn: 'http://localhost:8080/api/v1/monitoring/reactRqL9vG',
  integrations: [new ErrorsIntegration(), new MetricsIntegration()],
});

// document.querySelector('#app').innerHTML = `
// `;

document.querySelector('#btn').addEventListener('click', () => {
  monitor.reportMessage('上报消息');
  monitor.reportEvent('上报事件');
  throw new Error('test error');
});
