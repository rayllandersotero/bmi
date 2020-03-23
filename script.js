const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');
const tradeMetricBtn = document.querySelector('#trade');
const form = document.querySelector('form');
const result = document.querySelector('#bmi');
const tableRow = document.querySelectorAll('tbody tr');

/** Event with trade de metrics */
function tradeMetric(e) {
	let metric = e.target.getAttribute('data-metric');

	if (metric === 'm') {
		tradeMetricBtn.setAttribute('data-metric', 'in');
		tradeMetricBtn.innerHTML = 'm';

		weightInput.placeholder = 'lbs';
		heightInput.placeholder = 'in';
	} else {
		tradeMetricBtn.setAttribute('data-metric', 'm');
		tradeMetricBtn.innerHTML = 'in';

		weightInput.placeholder = 'kg';
		heightInput.placeholder = 'm';
	}
}
tradeMetricBtn.addEventListener('click', tradeMetric);

function calculate(e) {
	e.preventDefault();

	let metric = tradeMetricBtn.getAttribute('data-metric');
	let weight = weightInput.value;
	let height = heightInput.value;
	let bmi = 0;

	/** Preventing errors */
	if (!weight || !height) {
		return alert('Values are mandatory');
	}

	weight = Number(weight.replace(',', '.'));
	height = Number(height.replace(',', '.'));

	/** Calculating latin units (default) */
	if (metric === 'm') {
		bmi = weight / (height * height);
	}

	/** Calculating english units*/
	if (metric === 'in') {
		bmi = weight * 705 / 66 / 66;
	}

	/** Showing the result */
	result.value = bmi.toFixed(2);

	/** Coloring the table according to the result */
	tableRow.forEach((tr) => {
		let bmiMin = Number(tr.getAttribute('data-result-min'));
		let bmiMax = Number(tr.getAttribute('data-result-max'));

		tr.style.background = 'none';
		tr.style.color = '';

		if (bmiMin <= bmi && bmi <= bmiMax) {
			tr.style.background = 'var(--theme-color)';
			tr.style.color = 'var(--bg-color)';
		}
	});
}
form.addEventListener('submit', calculate);
