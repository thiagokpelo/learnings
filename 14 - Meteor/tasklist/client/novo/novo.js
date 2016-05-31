Template.novo.events({

	"submit #adicionaTarefa" : function (e, template) {
		e.preventDefault();

		var input = jQuery("#tarefa"),
			nome = input.val();
			
		// Tarefas.insert({nome: nome, data: new Date()});
		Meteor.call('adiciona', { nome: nome, usuario: this.userId });
		
		input.val("");
	}
})