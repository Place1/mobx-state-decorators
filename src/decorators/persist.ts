import { MobxEvent } from '../MobxTypes';
import { decoratorFactory } from '../core';
import * as serializer from '../serializer';

export interface PersistConfig {
  key: string;
}

export function persist(config: PersistConfig) {
  return decoratorFactory('mobx-decorators:persist', (mobxEvent: MobxEvent) => {
    switch (mobxEvent.type) {
      case 'add':
        const retrievedValue = localStorage.getItem(config.key) || '{}';
        const { value } = serializer.fromJson(retrievedValue);
        mobxEvent.object[mobxEvent.name] = value;
        break;

      case 'update':
        const serialisedValue = serializer.toJson({ value: mobxEvent.object[mobxEvent.name] });
        localStorage.setItem(config.key, serialisedValue);
        break;
    }
  });
}
