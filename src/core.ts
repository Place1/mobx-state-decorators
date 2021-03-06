import { spy } from 'mobx';
import { MobxEvent } from './MobxTypes';

export type MetadataKey = string;

export interface ObservableChangeHandler {
  (change: MobxEvent): void;
}

interface MetadataItem {
  property: string;
  changeHandler(event: MobxEvent): void;
}

type Metadata = MetadataItem[];

export function decoratorFactory(metadataKey: MetadataKey, changeHandler: ObservableChangeHandler) {
  return (target: any, property: string) => {
    const metadataItem: MetadataItem = { property, changeHandler };
    const existingMetadata = Reflect.getMetadata(metadataKey, target) || [];
    const metadata: Metadata = [...existingMetadata, metadataItem];
    Reflect.defineMetadata(metadataKey, metadata, target);
  };
}

spy((mobxEvent: MobxEvent) => {
  const { object, key } = mobxEvent;
  if (!object) {
    return;
  }
  const metadataKeys = Reflect.getMetadataKeys(object);
  metadataKeys.forEach((metadataKey) => {
    const metadata = Reflect.getMetadata(metadataKey, object) as Metadata | undefined;
    if (!metadata) {
      return;
    }
    metadata
      .filter((item) => item.property === key)
      .forEach((item) => item.changeHandler(mobxEvent));
  });
});
