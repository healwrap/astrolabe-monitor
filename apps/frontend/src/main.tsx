import './index.css';

import * as Sentry from '@sentry/browser';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

Sentry.init({
  dsn: 'https://9736628f5acf31ca201520b62810de24@o4509746917801984.ingest.us.sentry.io/4509746922979328',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
