import React, { Component } from 'react';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import Header from './componentes/Header';
import Timeline from './componentes/Timeline';

import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';

const reducers = combineReducers({ timeline, notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));


class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header store={store}/>
                    <Timeline login={this.props.match.params.login}
                        store={store}/>
                </div>
            </div>
        );
    }
}

export default App;
