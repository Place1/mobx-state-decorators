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
        // we do it in the next run of the event loop because the
        // otherwise initial value for class properties will override
        // the initial valaue we want.
        // i.e.
        // class MyStore {
        //   @persist(...)
        //   @observable
        //   myProperty: string = '';
        // }
        // The initial/default value for myProperty is an empty string ''
        // and this will be set on the observable after our spy pulls the
        // localstorage value. So we want to make sure our local storage
        // value happens after this.
        // Yes it's a massive hack :()
        setTimeout(() => mobxEvent.object[mobxEvent.key] = value, 0);
        break;

      case 'update':
        const serialisedValue = serializer.toJson({ value: mobxEvent.newValue });
        localStorage.setItem(config.key, serialisedValue);
        break;
    }
  });
}
