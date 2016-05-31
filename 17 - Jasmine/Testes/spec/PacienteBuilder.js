function PacienteBuilder () {

	var nome = 'Thiago';
	var idade = 28;
	var peso = 70;
	var altura = 1.70;

	var clazz = {

		comNome: function (valor) {
			nome = valor;
			return this;
		},

		comIdade: function (valor) {
			idade = valor;
			return this;
		},

		comPeso: function (valor) {
			peso = valor;
			return this;
		},

		comAltura: function (valor) {
			altura = valor;
			return this;
		},

		constroi: function () {
			return Paciente(nome, idade, peso, altura);
		}
	};

	return clazz;
}