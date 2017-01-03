class NegociacaoController {

	constructor() {

		let $ = document.querySelector.bind(document);
		let self = this;

		this._inputData = $('#data');
		this._inputQtd = $('#quantidade');
		this._inputValor = $('#valor');
		this._ordemAtual = '';
		this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
		this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
	}

	adiciona(event) {

		event.preventDefault();

		try {
			this._listaNegociacoes.adiciona(this._criaNegociacao());
			this._mensagem.texto = "Negociação adicionada com sucesso";
			this._limpaFormulario();
		} catch(erro) {
			this._mensagem.texto = erro;
		}
		
	}

	importaNegociacoes() {

		let service = new NegociacaoService();

		service
		.obterNegociacoes()
		.then((negociacoes) => negociacoes.forEach((negociacao) => {
			this._listaNegociacoes.adiciona(negociacao);
			this._mensagem.texto = "Negociações do período importadas";
		}))
		.catch((erro) => this._mensagem.texto = erro);
	}

	apaga() {

		this._listaNegociacoes.esvazia();
		this._mensagem.texto = "Negociações apagadas com sucesso";
	}

	ordena(coluna) {

		if (this._ordemAtual == coluna)
			this._listaNegociacoes.inverteOrdem();
		else
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);

		this._ordemAtual = coluna;
	}

	_criaNegociacao() {

		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQtd.value,
			this._inputValor.value
			);
	}

	_limpaFormulario() {

		this._inputData.value = '';
		this._inputQtd.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}
}