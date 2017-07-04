import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import App from './App';
import AutorAdmin from './Autor'
import LivroAdmin from './Livro'
import Home from './Home'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

ReactDOM.render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/autor" component={AutorAdmin} />
        <Route path="/livro" component={LivroAdmin}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('root'))

registerServiceWorker()
