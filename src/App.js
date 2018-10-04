import React, { Component } from 'react';
import Clock from './components/Clock';
import Controls from './components/Controls';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Container id="container">
            <Clock />
            <Controls />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
