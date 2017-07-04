import React, { Component } from 'react';

class Atualizacoes extends Component {
    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="#" className="fotoAtualizacoes-like">Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>

            </section>
        );
    }
}

class Informacoes extends Component {
    render() {
        return (
            <div className="foto-in fo">
                <div className="foto-info-likes">
                    {
                        this.props.foto.likers.map(liker => {
                            return <a key={liker.login} href="#">{liker.login},</a>
                        })
                    }

                    curtiram
                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">autor </a>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(comentario => {
                            return (
                                <li key={comentario.id} className="comentario">
                                    <a className="foto-info-autor">{comentario.login} </a>
                                    {comentario.texto}
                                </li>
                            );
                        })
                    }
                    

                </ul>
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <a href="#">{this.props.foto.loginUsuario}</a>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

export default class FotoItem extends Component {
    render() {
        return (
            <div className="foto">
                <Header foto={this.props.foto} />
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <Informacoes foto={this.props.foto} />
                <Atualizacoes />
            </div>
        );
    }
}
