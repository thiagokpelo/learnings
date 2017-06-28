import React, { Component } from 'react'
import $ from 'jquery'
import PubSub from 'pubsub-js'

import InputCustomizado from './componentes/InputCustomizado'
import Botao from './componentes/Botao'
import TratadorErros from './TratadorErros'

export class FormularioAutor extends Component {
  constructor() {
    super()
    this.state = { nome: '', email: '', senha: '' }
    this.enviaForm = this.enviaForm.bind(this)
    this.setNome = this.setNome.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setSenha = this.setSenha.bind(this)
  }

  enviaForm(evento) {
    evento.preventDefault()

    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      success: (novaListagem) => {
        PubSub.publish('atualiza-lista-autores', novaListagem)
        this.setState({ nome : '', email: '', senha : '' })
      },
      error: (erro) => {
        if(erro.status === 400) {
          new TratadorErros().publicaErros(erro.responseJSON)
        }
      },
      beforeSend: () => PubSub.pulish('limpa-erros', {})
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
    )
  }
}

export class TabelaAutores extends Component {
  render() {
    return (
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
              this.props.lista.map((autor) => {
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
    )
  }
}

export default class AutorBox extends Component {

  constructor() {
    super()
    this.state = { lista: [] }
  }

  componentDidMount() {
    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',
      dataType: 'json',
      success: (resposta) => this.setState({ lista: resposta })
    })

    PubSub.subscribe('atualiza-lista-autores', (topico, novaListagem) => this.setState({ lista : novaListagem }))
  }

  render() {
    return (
      <div>
        <FormularioAutor/>
        <TabelaAutores lista={this.state.lista}/>
      </div>
    )
  }
}
