import { observable } from 'mobx';
import { queryParam } from '../src';

export class Store {
  // @persist({ key: 'message '})
  @queryParam({ key: 'message' })
  @observable
  message: string = '';
}

const sharedStore: Store = new Store();

export default sharedStore;
