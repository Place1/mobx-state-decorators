import { observable } from 'mobx';
import { persist, queryParam } from '../src';

export class Store {
  @queryParam({ key: 'message' })
  @observable
  queryParamMessage: string = '';

  @persist({ key: 'message ' })
  @observable
  localStorageMessage: string = '';
}

const sharedStore: Store = new Store();

export default sharedStore;
