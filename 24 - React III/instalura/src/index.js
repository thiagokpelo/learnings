import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './componentes/PrivateRoute';

import Login from './componentes/Login';
import Logout from './componentes/Logout';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute exact path="/timeline" component={App} />
            <Route path="/timeline/:login" component={App} />
        </Switch>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
