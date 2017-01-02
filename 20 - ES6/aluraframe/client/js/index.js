var $inputs = [
	document.querySelector('#data'),
	document.querySelector('#quantidade'),
	document.querySelector('#valor')
];
var $tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function(ev) {
	ev.preventDefault();

	var $tr = document.createElement('tr');

	$inputs.forEach(function(el) {
		var $td = document.createElement('td');
		$td.textContent = el.value;
		$tr.appendChild($td);
	});

	var $tdVolume = document.createElement('td');
	$tdVolume.textContent = $inputs[1].value * $inputs[2].value;

	$tr.appendChild($tdVolume);

	$tbody.appendChild($tr);

	$inputs[0].value = "";
	$inputs[1].value = 1;
	$inputs[2].value = 0;

	$inputs[0].focus();
});