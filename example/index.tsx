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
        <h1>{sharedStore.message || 'no message'}</h1>
        <br />
        <input
          type="text"
          value={sharedStore.message}
          onChange={(event) => {
            const { value } = event.currentTarget;
            sharedStore.message = value;
          }}
        />
      </div>
    );
  }
}

const mount = document.getElementById('mount');
render(<App />, mount);
