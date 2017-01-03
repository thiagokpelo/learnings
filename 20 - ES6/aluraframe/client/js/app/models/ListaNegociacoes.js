class ListaNegociacoes {

	constructor(armadilha) {

		this._negociacoes = [];
	}

	adiciona(negociacao) {

		/* Gambiarra: não usar isso em hipótese alguma */
		//this._negociacoes = [].concat(this._negociacoes, negociacao);
		
		this._negociacoes.push(negociacao)
	}

	ordena(criterio) {

		this._negociacoes.sort(criterio);
	}

	inverteOrdem() {
		
		this._negociacoes.reverse();
	}

	get negociacoes() {

		return [].concat(this._negociacoes);
	}

	get volumeTotal() {

		return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
	}

	esvazia() {

		this._negociacoes = [];
	}
}