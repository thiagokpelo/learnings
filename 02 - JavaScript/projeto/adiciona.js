
var adicionar = document.querySelector('#adicionar-paciente');

adicionar.addEventListener('click', function(event){

	event.preventDefault(); // impedir comportamento padrão


	var campoNome = document.querySelector('#campo-nome');
	var campoPeso = document.querySelector('#campo-peso');
	var campoAltura = document.querySelector('#campo-altura');

	var pacienteNovo = "<tr class='paciente'>"+
							"<td class='info-nome' id='nome-3'>"+ campoNome.value +"</td>"+
							"<td class='info-peso' id='peso-3'>"+ campoPeso.value +"</td>"+
							"<td class='info-altura' id='altura-3'>"+ campoAltura.value +"</td>"+
							"<td class='info-imc' id='imc-3'></td>"+
						"</tr>";

	// Retorna um Array
	//document.querySelectorAll('table');

	// Retorna uma String
	var tabela = document.querySelector('table');
	tabela.innerHTML = tabela.innerHTML + pacienteNovo;

	campoNome.value = campoAltura.value = campoPeso.value = "";

});