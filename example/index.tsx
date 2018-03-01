import 'reflect-metadata';
import * as React from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import sharedStore from './store';

@observer
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Query Param Message = "{sharedStore.queryParamMessage}"</h1>
        <br />
        <input
          type="text"
          value={sharedStore.queryParamMessage}
          onChange={(event) => {
            sharedStore.queryParamMessage = event.currentTarget.value;
          }}
        />

        <hr />

        <h1>Local Storage Message = "{sharedStore.localStorageMessage}"</h1>
        <br />
        <input
          type="text"
          value={sharedStore.localStorageMessage}
          onChange={(event) => {
            sharedStore.localStorageMessage = event.currentTarget.value;
          }}
        />
      </div>
    );
  }
}

const mount = document.getElementById('mount');
render(<App />, mount);
