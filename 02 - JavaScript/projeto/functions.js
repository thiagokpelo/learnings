// function calculaImc(){
// 	if (this.altura != 0) {
// 		var imc = this.peso / (this.altura * this.altura);
// 	    return imc;
// 	} else {
// 		console.log('Não é possível fazer o cálculo');
// 	};
// };


// Função que cria o Objeto Paciente
function montaPaciente(trsPaciente){

	var nome = trsPaciente.getElementsByClassName("info-nome")[0].textContent;
	var peso = trsPaciente.getElementsByClassName("info-peso")[0].textContent;
	var altura = trsPaciente.getElementsByClassName("info-altura")[0].textContent;

	var paciente = {
		nome   : nome,
		peso   : peso,
		altura : altura,
		pegaImc : function(){
					return peso/(altura*altura);
		}
	};

	return paciente;
};

function percorreArray(nossosTrs, comportamento){
    for(var posicaoDoTrAtual = 0; posicaoDoTrAtual <= nossosTrs.length - 1; posicaoDoTrAtual++){
        var trDoPacienteAtual = nossosTrs[posicaoDoTrAtual];
        comportamento(trDoPacienteAtual); 
    }
}