describe('Consulta', function () {

	var thiago;

	beforeEach(function () {
		thiago = new PacienteBuilder().constroi();
		// thiago = new PacienteBuilder().comIdade(20).comPeso(80).constroi();
	});

	describe('consultas do tipo retorno', function () {
		it('#não deve cobrar nada se for um retorno', function () {
			var consulta = new Consulta(thiago, [], true, true);

			expect(consulta.preco()).toEqual(0);
		});
	});

	describe('consultas com procedimentos', function () {
		it('#deve cobrar 25 de cada procedimento comum', function () {
			var consulta = new Consulta(thiago, ['proc1', 'proc2', 'proc3'], false, false);

			expect(consulta.preco()).toEqual(75);
		});

		it('#deve cobrar preço especifico dependendo do procedimento', function () {
			var consulta = new Consulta(thiago, ['procedimento-comum', 'raio-x', 'procedimento-comum', 'gesso'], false, false);

			expect(consulta.preco()).toEqual(25 + 55 + 25 + 32);
		});

		it('#deve cobrar preço dos procedimentos e dobrar pela consulta particular', function () {
			var consulta = new Consulta(thiago, ['procedimento-comum', 'raio-x', 'procedimento-comum', 'gesso'], true, false);

			expect(consulta.preco()).toEqual((25 + 55 + 25 + 32) * 2);
		});
	});

});