import * as queryString from 'query-string';
import { MobxEvent } from '../MobxTypes';
import * as serializer from '../serializer';
import { decoratorFactory } from '../core';

export interface QueryParamConfig {
  key: string;
  strategy?: 'pushState' | 'replaceState';
}

export function queryParam(config: QueryParamConfig) {
  return decoratorFactory('mobx-decorators:queryParam', (mobxEvent: MobxEvent) => {
    const query = queryString.parse(location.search);
    switch (mobxEvent.type) {
      case 'add':
        mobxEvent.object[config.key] = serializer.fromJson(query[config.key]);
        break;

      case 'update':
        query[config.key] = serializer.toJson(mobxEvent.newValue);
        const newQuery = queryString.stringify(query);
        const newUrlState = `${window.location.origin}?${newQuery}`;
        window.history[config.strategy || 'replaceState'](null, document.title, newUrlState);
        break;
    }
  });
}
