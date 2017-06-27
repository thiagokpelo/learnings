import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado'
import Botao from './componentes/Botao'
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {
  constructor() {
    super()
    this.state = { lista: [], nome: '', email: '', senha: '' }
    this.enviaForm = this.enviaForm.bind(this)
    this.setNome = this.setNome.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setSenha = this.setSenha.bind(this)
  }

  componentWillMount() {
    console.log('Antes de renderizar')
  }

  componentDidMount() {
    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',
      dataType: 'json',
      success: (resposta) => this.setState({ lista: resposta })
    })
  }

  enviaForm(evento) {
    evento.preventDefault()

    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      success: (resposta) => this.setState({ lista: resposta }),
      error: (erro) => console.log('erro')
    })
  }

  setNome(evento) {
    this.setState({ nome: evento.target.value })
  }

  setEmail(evento) {
    this.setState({ email: evento.target.value })
  }

  setSenha(evento) {
    this.setState({ senha: evento.target.value })
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link"><span></span></a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                <InputCustomizado name="nome"
                                  type="text"
                                  label="Nome:"
                                  value={this.state.nome}
                                  onChange={this.setNome} />

                <InputCustomizado name="email"
                                  type="email"
                                  label="E-mail:"
                                  value={this.state.email}
                                  onChange={this.setEmail} />

                <InputCustomizado name="senha"
                                  type="password"
                                  label="Senha:"
                                  value={this.state.senha}
                                  onChange={this.setSenha} />

                <Botao type="submit" label="Gravar" />
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map((autor) => {
                      return (
                        <tr key={autor.id}>
                          <td>{ autor.nome }</td>
                          <td>{ autor.email }</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
