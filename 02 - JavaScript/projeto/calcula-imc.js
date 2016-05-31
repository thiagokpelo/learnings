
var button = document.getElementById('calcula-imcs');
// button.onclick = calculaTodosImcs;

button.addEventListener('click', function(){

    var pacientes = document.getElementsByClassName("paciente");

    for(var posicaoAtual = 0; posicaoAtual <= pacientes.length; posicaoAtual++){

        var trDoPaciente = pacientes[posicaoAtual];
        var trDoImc = trDoPaciente.getElementsByClassName("info-imc")[0];
        var paciente = montaPaciente(trDoPaciente);
        var imc = paciente.pegaImc();

        trDoImc.textContent = imc;

        console.log(imc);
    }
    
    percorreArray(pacientes, function(trAtual){
        //monta paciente
        var imc = paciente.pegaImc(); // pega o imc do paciente atual
        imcTd.textContent = imc; // atualiza imc
        console.log(imc); // imprime o imc do paciente atual    
    });

});

button.addEventListener('click', function(){
    console.log('Calcula todos os imcs');
});


// var trs = document.getElementsByTagName('tr');

// percorreArray(trs, function(tr){
//     tr.addEventListener("mouseover", function(){

//         this.setAttribute('bgcolor', 'grey');
//     });
// });