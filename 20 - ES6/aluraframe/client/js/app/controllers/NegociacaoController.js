'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ListaNegociacoes = require('../models/ListaNegociacoes');

var _Mensagem = require('../models/Mensagem');

var _NegociacoesView = require('../view/NegociacoesView');

var _MensagemView = require('../view/MensagemView');

var _NegociacaoService = require('../services/NegociacaoService');

var _DateHelper = require('../helpers/DateHelper');

var _Bind = require('../helpers/Bind');

var _Negociacao = require('../models/Negociacao');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
	function NegociacaoController() {
		_classCallCheck(this, NegociacaoController);

		var $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQtd = $('#quantidade');
		this._inputValor = $('#valor');
		this._ordemAtual = '';
		this._listaNegociacoes = new _Bind.Bind(new _ListaNegociacoes.ListaNegociacoes(), new _NegociacoesView.NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
		this._mensagem = new _Bind.Bind(new _Mensagem.Mensagem(), new _MensagemView.MensagemView($('#mensagemView')), 'texto');
		this._service = new _NegociacaoService.NegociacaoService();

		this._init();
	}

	_createClass(NegociacaoController, [{
		key: '_init',
		value: function _init() {
			var _this = this;

			console.log("Iniciou nosso NegociacaoController");

			this._service.lista().then(function (negociacoes) {
				return negociacoes.forEach(function (negociacao) {
					return _this._listaNegociacoes.adiciona(negociacao);
				});
			}).catch(function (erro) {
				return _this._mensagem.texto = erro;
			});

			window.setInterval(function () {
				console.log("Importou");
				_this.importaNegociacoes();
			}, 3000);
		}
	}, {
		key: 'adiciona',
		value: function adiciona(event) {
			var _this2 = this;

			event.preventDefault();

			var negociacao = this._criaNegociacao();

			this._service.cadastra(negociacao).then(function (mensagem) {
				_this2._listaNegociacoes.adiciona(negociacao);
				_this2._mensagem.texto = mensagem;
				_this2._limpaFormulario();
			}).catch(function (erro) {
				return _this2._mensagem.texto = erro;
			});
		}
	}, {
		key: 'importaNegociacoes',
		value: function importaNegociacoes() {
			var _this3 = this;

			this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
				return negociacoes.forEach(function (negociacao) {
					_this3._listaNegociacoes.adiciona(negociacao);
					_this3._mensagem.texto = "Negociações do período importadas";
				});
			}).catch(function (erro) {
				return _this3._mensagem.texto = erro;
			});
		}
	}, {
		key: 'apaga',
		value: function apaga() {
			var _this4 = this;

			this._service.limpa().then(function (mensagem) {
				_this4._mensagem.texto = mensagem;
				_this4._listaNegociacoes.esvazia();
			}).catch(function (erro) {
				return _this4._mensagem.texto = erro;
			});
		}
	}, {
		key: 'ordena',
		value: function ordena(coluna) {

			if (this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdem();else this._listaNegociacoes.ordena(function (a, b) {
				return a[coluna] - b[coluna];
			});

			this._ordemAtual = coluna;
		}
	}, {
		key: '_criaNegociacao',
		value: function _criaNegociacao() {

			return new _Negociacao.Negociacao(_DateHelper.DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQtd.value), parseFloat(this._inputValor.value));
		}
	}, {
		key: '_limpaFormulario',
		value: function _limpaFormulario() {

			this._inputData.value = '';
			this._inputQtd.value = 1;
			this._inputValor.value = 0.0;

			this._inputData.focus();
		}
	}]);

	return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map