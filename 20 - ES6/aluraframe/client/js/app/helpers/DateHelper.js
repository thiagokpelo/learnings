class DateHelper {

	constructor() {

		throw new Error('Esta classe não pode ser instanciada');
	}

	static dataParaTexto(data) {
		
		return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
	}

	static textoParaData(texto) {

		let regex = /^\d{4}-\d{2}-\d{2}$/;

		if(!regex.test(texto))
			throw new Error("Deve estar no formato aaaa-mm-dd");
		
		return new Date(...texto.split('-').map((item, index) => item - index % 2));
	}

}