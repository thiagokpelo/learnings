import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App';
import AutorBox from './Autor'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render((
  <Router history={createBrowserHistory}>
    <div>
      <Route path="/" component={App} />
      <Route path="/autor" component={AutorBox} />
      <Route path="/livro" />
    </div>
  </Router>
), document.getElementById('root'));

registerServiceWorker();
