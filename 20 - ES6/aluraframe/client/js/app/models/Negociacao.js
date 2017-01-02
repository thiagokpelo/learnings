class Negociacao {

	constructor(data, qtd, valor) {

		this._data = new Date(data.getTime());
		this._quantidade = qtd;
		this._valor = valor;
		Object.freeze(this);
	}

	get data() {
		return new Date(this._data.getTime());
	}

	get quantidade() {
		return this._quantidade;
	}

	get valor() {
		return this._valor;
	}

	get volume() {
		return this._quantidade * this._valor;
	}
}