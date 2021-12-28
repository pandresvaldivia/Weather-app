function cardTemplate() {
	const cardString = `
        <article class="weatherCard">
            <div class="weatherCard-description">
                <p class="weatherCard-date">Tomorrow</p>
                <figure class="weatherCard-image">
                    <img src="./assets/images/Thunderstorm.png" alt="" />
                </figure>
            </div>
            <p class="weatherCard-details">
                <span>16°C</span><span>11°C</span>
            </p>
        </article>
    `;

	const card = createDOMElement(cardString);
	return card;
}

function createDOMElement(string) {
	const parser = new DOMParser();
	const html = parser.parseFromString(string, 'text/html');
	return html.body.firstChild;
}
