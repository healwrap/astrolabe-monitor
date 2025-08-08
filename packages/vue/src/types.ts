/* eslint-disable @typescript-eslint/no-explicit-any */

export type Hook =
  | 'activated'
  | 'beforeCreate'
  | 'beforeDestroy'
  | 'beforeUnmount'
  | 'beforeMount'
  | 'beforeUpdate'
  | 'created'
  | 'deactivated'
  | 'destroyed'
  | 'unmounted'
  | 'mounted'
  | 'updated';

export interface Vue {
  config: {
    errorHandler?: any;
    warnHandler?: any;
  };
  mixin: (mixins: Partial<Record<Hook, any>>) => void;
}

export type ViewModel = {
  _isVue?: boolean;
  __isVue?: boolean;
  $root: ViewModel;
  $parent?: ViewModel;
  $props: { [key: string]: any };
  $options?: {
    name?: string;
    propsData?: { [key: string]: any };
    _componentTag?: string;
    __file?: string;
    __name?: string;
  };
};

export interface VueOptions extends Record<string, unknown> {
  // 适配vue2
  Vue?: Vue;
  // 适配vue3
  app?: Vue | Vue[];
}

export type IntegrationOptions = VueOptions;
