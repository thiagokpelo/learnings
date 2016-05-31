(function () {
	'use strict';

	var $wrapCard = document.querySelector('.wrap-card'),
		$cardColors = document.querySelectorAll('.card-colors');

	$wrapCard.addEventListener('click', function (event) {

		var $this = event.target,
			$card = $this.parentNode.parentNode.parentNode,
			$cardContent = $card.querySelector('.card-content');

		if ($this.dataset.color) {

			for (var index = 0; index < $cardColors.length; index++) {
				$cardColors[index].classList.remove('isActive');
			}

			$card.dataset.color = $this.dataset.color;
			$this.classList.add('isActive');
		}

		if ($this.classList.contains('card_delete')) {
			$card.remove();
		}

		if ($this.classList.contains('card_edit')) {
			if ($cardContent.getAttribute('contenteditable') === 'false') {
				$cardContent.setAttribute('contenteditable', 'true');
				$cardContent.classList.add('isActive');
				$cardContent.focus();
			} else {
				$cardContent.setAttribute('contenteditable', 'false');
				$cardContent.classList.remove('isActive');
				$cardContent.blur();
			}
		}

	});
	



})();