import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import FotoItem from './FotoItem';
import TimelineApi from '../logicas/TimelineApi';
import { connect } from 'react-redux';

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.login = this.props.login;
    }

    carregaFotos() {
        let URL;

        if (this.login === undefined) {
            URL = `http://localhost:8080/api/fotos/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        }else {
            URL = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        this.props.lista(URL);
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.login !== this.login) {
            this.login = newProps.login;
            this.carregaFotos();
        }
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup transitionName="timeline"
                                         transitionEnterTimeout={500}
                                         transitionLeaveTimeout={300}>
                    {
                        this.props.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.props.like} comenta={this.props.comenta}/>)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { fotos : state.timeline }
}

const mapDispatchToProps = dispatch => {
    return {
        like : (fotoId) => dispatch(TimelineApi.like(fotoId)),
        comenta: (fotoId, textoComentario) => dispatch(TimelineApi.comenta(fotoId, textoComentario)),
        lista: (urlPerfil) => dispatch(TimelineApi.lista(urlPerfil))
    }
}

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;
