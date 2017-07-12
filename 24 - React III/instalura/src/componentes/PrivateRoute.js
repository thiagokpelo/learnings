import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const verificaAutenticacao = () => {
    return localStorage.getItem('auth-token') !== null;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        verificaAutenticacao() ? (
            <Component {...props} />
        ) : (
            <Redirect to="/?msg=voce não pode acessar, é preciso estar logado" />
        )
    )} />
);

export default PrivateRoute;
