import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './componentes/Login';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

function verificaAutenticacao(next, replace) {
  if (localStorage.getItem('auth-token' === null)) replace('/');
}

ReactDOM.render(
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/timeline" component={App} onEnter={verificaAutenticacao}/>
      </Switch>
    </Router>  
, document.getElementById('root'));
registerServiceWorker();
