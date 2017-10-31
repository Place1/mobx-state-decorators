# Mobx State Decorators

The goal of this package is to make simple to sync your store's observable properties
with different parts of the browser such as a QueryParameter or in Local Storage.

This package is **Experimental** for now! Let me know if you like the idea by starring
the project or messaging me!

## System Requirements
- NodeJS 8

## Scripts
- `npm start`
- `npm test`
- `npm run build`
- `npm run lint`

## Example
```javascript
import { observable } from 'mobx';
import { queryParam } from '..';

export class Store {

  // will sync the observable with the 'message' query parameter in
  // the url bar
  @queryParam({ key: 'message' })
  @observable
  message: string = '';

  // will sync the observable with the 'page' query param, but will
  // use history.pushState() so the user can press the back button!
  @queryParam({ key: 'page', strategy: 'pushState' })
  @observable
  pageNumber: string = '0';

  // will sync the observable with the 'token' key in localstorage
  @persist({ key: 'token' })
  @observable
  token: string = '';
}
```

## Note
This package requires `reflect-metadata` to be included!
Make sure you have a `import 'reflect-metadata` somewhere in your application before you use this package!
