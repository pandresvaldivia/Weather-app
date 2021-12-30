import { createDomElement } from './utils/dom.js';

function getItemInfoTemplate({ speed, deg, humidity, visibility, pressure }) {
	return `
        <div class="hightlightCard-container">
            <article class="hightlightCard">
                <div class="hightlightCard-data">
                    <h3 class="hightlightCard-title">Wind status</h3>
                    <p class="hightlightCard-datum">
                        <span>${speed}</span><span>mph</span>
                    </p>
                </div>
                <p class="hightlightCard-wind">
                    <span class="hightlightCard-windIcon"
                        ><i class="icon-wind"></i></span
                    ><span class="hightlightCard-windDirection">${deg}</span>
                </p>
            </article>
            <article class="hightlightCard">
                <div class="hightlightCard-data">
                    <h3 class="hightlightCard-title">Humidity</h3>
                    <p class="hightlightCard-datum">
                        <span>${humidity}</span><span>%</span>
                    </p>
                </div>
                <div class="progressBar">
                    <p class="progressBar-percentages">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </p>
                    <progress
                        class="progressBar-bar"
                        id="humidity"
                        value="${humidity}"
                        max="100"
                    ></progress>
                </div>
            </article>
            <article class="hightlightCard">
                <div class="hightlightCard-data">
                    <h3 class="hightlightCard-title">Visibility</h3>
                    <p class="hightlightCard-datum">
                        <span>${visibility}</span> <span>miles</span>
                    </p>
                </div>
            </article>
            <article class="hightlightCard">
                <div class="hightlightCard-data">
                    <h3 class="hightlightCard-title">Air Pressure</h3>
                    <p class="hightlightCard-datum">
                        <span>${pressure}</span> <span>mb</span>
                    </p>
                </div>
            </article>
        </div>
    `;
}

function createItemInfo(data, index) {
	const template = getItemInfoTemplate(data);
	const itemInfo = createDomElement(template);

	if (index > 0) itemInfo.classList.add('is-hidden');
	itemInfo.dataset.index = `item-${index}`;

	return itemInfo;
}

export { createItemInfo };
