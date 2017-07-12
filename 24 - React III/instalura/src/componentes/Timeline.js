import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import FotoItem from './FotoItem';
import TimelineApi from '../logicas/TimelineApi';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.login = this.props.login;
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            this.setState({fotos: this.props.store.getState()});
        });
    }

    carregaFotos() {
        let URL;

        if (this.login === undefined) {
            URL = `http://localhost:8080/api/fotos/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        }else {
            URL = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        this.props.store.dispatch(TimelineApi.lista(URL));
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.login !== undefined) {
            this.login = newProps.login;
            this.carregaFotos();
        }
    }

    like(fotoId) {
        this.props.store.dispatch(TimelineApi.like(fotoId));
    }

    comenta(fotoId, textoComentario) {
        this.props.store.dispatch(TimelineApi.comenta(fotoId, textoComentario));
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup transitionName="timeline"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)}/>)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
