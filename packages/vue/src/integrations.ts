import { BaseIntegration, Options } from '@healwrap/monitor-sdk-core';

import { IntegrationOptions, ViewModel, Vue } from './types';
import { formatComponentName, generateComponentTrace } from './vendor/components';

export class VueIntegration extends BaseIntegration {
  constructor(integrationOptions: IntegrationOptions = {}) {
    super(integrationOptions);
  }

  protected setup(options: Options & IntegrationOptions) {
    if (options.app) {
      const apps = Array.isArray(options.app) ? options.app : [options.app];
      apps.forEach(app => vueInit(app, options));
    } else if (options.Vue) {
      vueInit(options.Vue, options);
    } else {
      console.warn('VueIntegration: Vue instance not found');
    }
  }
}

function vueInit(app: Vue, options: Options & IntegrationOptions) {
  // sentry 中有一些其他操作，这里省略
  attachErrorHandler(app, options);
}

export const attachErrorHandler = (app: Vue, options: Options): void => {
  const { errorHandler: originalErrorHandler } = app.config;
  app.config.errorHandler = (error: Error, vm: ViewModel, lifecycleHook: string): void => {
    const componentName = formatComponentName(vm, false);
    const trace = vm ? generateComponentTrace(vm) : '';
    const metadata: Record<string, unknown> = {
      componentName,
      lifecycleHook,
      trace,
    };

    // if (options.attachProps && vm) {
    //   // Vue2 - $options.propsData
    //   // Vue3 - $props
    //   if (vm.$options?.propsData) {
    //     metadata.propsData = vm.$options.propsData;
    //   } else if (vm.$props) {
    //     metadata.propsData = vm.$props;
    //   }
    // }

    setTimeout(() => {
      options.transport.send({
        type: 'vue-error',
        error,
        captureContext: { contexts: { vue: metadata } },
        mechanism: { handled: !!originalErrorHandler, type: 'vue' },
      });
    });
    throw error;
  };
};
