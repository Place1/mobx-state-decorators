import { spy } from 'mobx';
import { MobxEvent } from './MobxTypes';

export type MetadataKey = string;

export interface ObservableChangeHandler {
  (change: MobxEvent): void;
}

const registry = new Map<MetadataKey, ObservableChangeHandler>();

export function decoratorFactory(metadataKey: MetadataKey, changeHandler: ObservableChangeHandler) {
  registry.set(metadataKey, changeHandler);
  return (target: any, key: string) => {
    Reflect.defineMetadata(metadataKey, undefined, target);
  };
}

spy((mobxEvent: MobxEvent) => {
  const { object } = mobxEvent;
  if (!object) {
    return;
  }
  const metadataKeys = Reflect.getMetadataKeys(object);
  for (const key of metadataKeys) {
    const registeredFunction = registry.get(key);
    if (registeredFunction) {
      registeredFunction(mobxEvent);
    }
  }
});
