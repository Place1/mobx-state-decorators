import { spy } from 'mobx';
import { MobxEvent } from './MobxTypes';

export type MetadataKey = string;

export interface ObservableChangeHandler {
  (change: MobxEvent): void;
}

const registry = new Map<MetadataKey, ObservableChangeHandler>();

export function decoratorFactory(metadataKey: MetadataKey, changeHandler: ObservableChangeHandler) {
  registry.set(metadataKey, changeHandler);
  return (target: any, property: string) => {
    Reflect.defineMetadata(metadataKey, { property }, target);
  };
}

spy((mobxEvent: MobxEvent) => {
  const { object, name } = mobxEvent;
  if (!object) {
    return;
  }
  const metadataKeys = Reflect.getMetadataKeys(object);
  for (const key of metadataKeys) {
    const metadata = Reflect.getMetadata(key, object);
    const registeredFunction = registry.get(key);
    if (registeredFunction && name === metadata.property) {
      // only run the registered function if the
      // property name of the observable matches
      // the property name the function was registered
      // for (i.e. it's the property with the mobx-state-decorator).
      registeredFunction(mobxEvent);
    }
  }
});
