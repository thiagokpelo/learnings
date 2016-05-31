function Agendamento () {

	var clazz = {

		para: function (consulta) {
			var umDiaEmMilisegundos = 1000 * 60 * 60 * 24,
				vinteDiasEmMilisgundos = umDiaEmMilisegundos * 20,
				novaData = new Date(consulta.getData().getTime() + vinteDiasEmMilisgundos),
				novaCosulta;

			while (novaData.getDay() == 0 || novaData.getDay() == 6) {
				novaData = new Date(novaData.getTime() + umDiaEmMilisegundos);
			}

			novaConsulta = new Consulta(consulta.getNome(), consulta.getProcedimentos(), consulta.isParticular(), true, novaData);
			
			return novaConsulta;
		}
	};
	return clazz;
};