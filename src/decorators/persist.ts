import { MobxEvent } from '../MobxTypes';
import { decoratorFactory } from '../core';
import * as serializer from '../serializer';

export interface PersistConfig {
  key: string;
  defaultValue?: any;
}

export function persist(config: PersistConfig) {
  return decoratorFactory('mobx-decorators:persist', (mobxEvent: MobxEvent) => {
    switch (mobxEvent.type) {
      case 'add':
        if (!(config.key in localStorage)) {
          mobxEvent.object[mobxEvent.key] = config.defaultValue;
        } else {
          const retrievedValue = localStorage.getItem(config.key) || '{}';
          const { value } = serializer.fromJson(retrievedValue);
          mobxEvent.object[mobxEvent.key] = value;
        }
        break;

      case 'update':
        const serialisedValue = serializer.toJson({ value: mobxEvent.newValue });
        localStorage.setItem(config.key, serialisedValue);
        break;
    }
  });
}
