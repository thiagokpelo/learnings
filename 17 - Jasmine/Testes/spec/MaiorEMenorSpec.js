describe('MaiorEMenor', function () {

	it("Deve entender números em ordem e não sequencial", function () {
		
		var algoritmo = new MaiorMenor();
		algoritmo.encontra([5, 15, 7, 9]);

		expect(algoritmo.pegaMaior()).toEqual(15);
		expect(algoritmo.pegaMenor()).toEqual(5);
	});

	it("Deve entender números em ordem crescente", function () {

		var algoritmo = new MaiorMenor();
		algoritmo.encontra([5, 6, 7, 8]);

		expect(algoritmo.pegaMaior()).toEqual(8);
		expect(algoritmo.pegaMenor()).toEqual(5);
	});

	it("Deve entender números em ordem decrescente", function () {

		var algoritmo = new MaiorMenor();
		algoritmo.encontra([8, 7, 6, 5]);

		expect(algoritmo.pegaMaior()).toEqual(8);
		expect(algoritmo.pegaMenor()).toEqual(5);
	});

	it("Deve entender apenas um número", function () {

		var algoritmo = new MaiorMenor();
		algoritmo.encontra([20]);

		expect(algoritmo.pegaMaior()).toEqual(20);
		expect(algoritmo.pegaMenor()).toEqual(20);
	});
});