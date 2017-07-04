import React, { Component } from 'react'
import $ from 'jquery'
import PubSub from 'pubsub-js'

import InputCustomizado from './componentes/InputCustomizado'
import Botao from './componentes/Botao'
import TratadorErros from './TratadorErros'

export class FormularioLivro extends Component {
  constructor() {
    super()
    this.state = { titulo: '', preco: '', autorId: '' }
    this.enviaForm = this.enviaForm.bind(this)
  }

  enviaForm(evento) {
    evento.preventDefault()

    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/livros',
      type: 'post',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId }),
      success: (novaListagem) => {
        PubSub.publish('atualiza-lista-livros', novaListagem)
        this.setState({ titulo : '', preco: '', autorId : '' })
      },
      error: (erro) => {
        if(erro.status === 400) {
          new TratadorErros().publicaErros(erro.responseJSON)
        }
      },
      beforeSend: () => PubSub.publish('limpa-erros', {})
    })
  }

  salvaAlteracao(nomeInput, evento) {
    var campoAlterado = {}
    campoAlterado[nomeInput] = evento.target.value

    this.setState(campoAlterado)
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
          <InputCustomizado name="titulo"
                            id="titulo"
                            type="text"
                            label="Titulo:"
                            value={this.state.titulo}
                            onChange={this.salvaAlteracao.bind(this, 'titulo')} />

          <InputCustomizado name="preco"
                            id="preco"
                            type="text"
                            label="Preço:"
                            value={this.state.preco}
                            onChange={this.salvaAlteracao.bind(this, 'preco')} />

          <div className="pure-control-group">
            <label htmlFor="autorId">Autor:</label>
            <select value={this.state.autorId} id="autorId"name="autorId" onChange={this.setAutorId}>
              <option value="">Selecione autor</option>
              {
                this.props.autores.map((autor) => {
                  return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                })
              }
            </select>
          </div>

          <Botao type="submit" label="Gravar" />
        </form>
      </div>
    )
  }
}

export class TabelaLivros extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Preço</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lista.map((livro) => {
                return (
                  <tr key={livro.id}>
                    <td>{livro.titulo}</td>
                    <td>{livro.preco}</td>
                    <td>{livro.autor.nome}</td>
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

export default class LivroAdmin extends Component {

  constructor() {
    super()
    this.state = { livros: [], autores: [] }
  }

  componentDidMount() {
    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/livros',
      dataType: 'json',
      success: (resposta) => this.setState({ livros: resposta })
    })

    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',
      dataType: 'json',
      success: (resposta) => this.setState({ autores: resposta })
    })

    PubSub.subscribe('atualiza-lista-livros', (topico, novaListagem) => this.setState({ livros : novaListagem }))
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Livro</h1>
        </div>
        <div className="content" id="content">
          <FormularioLivro autores={this.state.autores}/>
          <TabelaLivros lista={this.state.livros}/>
        </div>
      </div>
    )
  }
}
