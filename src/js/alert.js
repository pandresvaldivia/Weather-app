import { createDomElement } from './utils/dom.js';
import { $alertContainer } from './selectors.js';

function getAlertTemplate(message) {
	return `
        <div class="alert">
            <p>${message}</p>
        </div>
    `;
}

function printAlert(message) {
	if (document.querySelector('.alert')) return;

	const alertTemplate = getAlertTemplate(message);
	const $alert = createDomElement(alertTemplate);

	$alertContainer.appendChild($alert);

	setTimeout(() => {
		$alert.remove();
	}, 1000);
}

export { printAlert };
