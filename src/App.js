import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Shortlisted from './components/Shortlisted';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to User Selection</h1>
          </header>
          <Router>
          <div>
          <div className="nav">
            <ul>
              <li>
                <Link to={'/'}>Home </Link>
                <Link to={'/shortlisted'}>Shortlisted</Link>
              </li>
            </ul>
          </div>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/shortlisted" component={Shortlisted} />
            </Switch>
            </div>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
