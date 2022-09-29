export const getlineChartOptions = (chartData, dataCategory, type, resolution) => {
	return {
		// indexAxis: 'xAxis',
		responsive: true,
		maintainAspectRatio: false,
		parsing: false,
		animation: true,
		scales: {
			'y-axis-1': {
				indexAxis: 'xAxis',
				position: 'left',
				reverse: false,
				type: type,
				bounds: 'ticks',
				beginAtZero: false,
				ticks: {
					callback: (value, i, t) => {
						if (i === 0) return;

						if (type === 'logarithmic' && (value === 0.1 || value === 1 || value === 10 || value === 100)) {
							return value;
						} else if (
							type === 'logarithmic' &&
							(value === 1000 || (value === 10000) | (value === 100000))
						) {
							return `${value / 1000} K`;
						} else if (type === 'logarithmic' && value === 1000000) {
							return '1 M';
						} else if (type === 'logarithmic') return;

						const lastValue = t[t.length - 1].value;
						if (lastValue >= 1000000000 && (value / 1000000000) % 1 === 0) {
							return `${value / 1000000000} B`;
						} else if (lastValue >= 1000000000) {
							return `${(value / 1000000000).toFixed(1)} B`;
						} else if (lastValue >= 1000000 && (value / 1000000) % 1 === 0) {
							return `${value / 1000000} M`;
						} else if (lastValue >= 1000000) {
							return `${(value / 1000000).toFixed(1)} M`;
						} else if (lastValue >= 1000 && value % 1000 === 0) {
							return `${value / 1000} K`;
						} else if (lastValue >= 1000) {
							return `${(value / 1000).toFixed(1)} K`;
						} else if (lastValue < 1) {
							return `${value.toFixed(2)}`;
						} else {
							return `${value}`;
						}
					},
					// maxRotation: 0,
					color: 'rgba(0, 0, 0, 1)',
					padding: 10,
					display: true,
					font: {
						family: "'Poppins','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						size: 10,
						weight: 600,
						lineHeight: 1,
						style: 'normal',
					},
					crossAlign: 'far',
				},
				grid: {
					display: true,
					color: 'rgba(0, 0, 0, 0.05)',
					lineWidth: 1,
					drawBorder: false,
					drawTicks: true,
					tickLength: 10,
				},
			},
			xAxis: {
				min: chartData[0].x,
				max: chartData[chartData.length - 1].x,
				type: 'time',
				time: {
					unit: 'day',
					stepSize: 1,
					displayFormats: {
						millisecond: '',
						seconds: '',
						minute: '',
						hour: '',
						day: 'MMM d',
						week: 'yy MMM',
						month: 'yy MMM',
						quarter: 'yy MMM',
						year: 'yyyy',
					},
				},
				ticks: {
					padding: 10,
					// callback: () => ``,
					minRotation: 45,
					color: 'rgba(0, 0, 0, 1)',
					font: {
						family: "'Poppins','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						size: 10,
						weight: 600,
						lineHeight: 1,
						style: 'normal',
					},
					maxTicksLimit: 12,
				},
				grid: {
					display: false,
					borderColor: 'rgba(0, 0, 255, 1)',
					borderWidth: 0,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
				position: 'top',
			},
			title: {
				display: false,
			},
			tooltip: {
				position: 'average',
				borderWidth: 0,
				backgroundColor: 'rgba(0, 0, 0, 1)',
				bodyColor: 'white',
				padding: 10,
				titleFont: {
					size: 14,
					weight: 500,
				},
				titleAlign: 'center',
				caretSize: 0,
				caretPadding: 20,
				displayColors: true,
				cornerRadius: 0,
				boxWidth: 5,
				boxHeight: 5,
				boxPadding: 5,
				usePointStyle: true,
				xAlign: 'right',
				yAlign: 'bottom',
				animation: false,
				callbacks: {
					title: (data) => {
						const dataPointLabel = data[0].label;
						const [date, year] = dataPointLabel.split(',');
						return `${date}, ${year}`;
					},
					label: (data) => {
						if (dataCategory === 'price') {
							return 'PRICE';
						} else if (dataCategory === 'mCap') {
							return 'MCAP';
						} else if (dataCategory === 'volume') {
							return 'VOLUME';
						} else if (dataCategory === 'tvl') {
							return 'TVL';
						}
						const floatVal = parseFloat(data.formattedValue.replace(',', ''));
						const numOfDecimals = floatVal < 1 ? 3 : 2;
						const currencyStr = floatVal.toLocaleString('en-US', {
							maximumFractionDigits: numOfDecimals,
							style: 'currency',
							currency: 'USD',
						});
						return `${'ABC'}: ${currencyStr}`;
					},
				},
			},
			decimation: {
				enabled: true,
				algorithm: 'lttb',
				// algorithm: 'min-max',
				// samples: Math.floor(chartData.length / resolution),
				samples: 500,
				threshold: 365,
			},
			zoom: {
				pan: {
					enabled: false,
					mode: 'x',
				},
				zoom: {
					wheel: {
						enabled: true,
						modifierKey: 'shift',
						speed: 0.1,
					},
					drag: {
						enabled: true,
						backgroundColor: 'rgba(0, 0, 255, 0.1)',
						borderColor: 'rgba(0, 0, 255, 1)',
						borderWidth: 1,
						threshold: 10,
					},
					pinch: {
						enabled: true,
					},
					mode: 'x',
				},
				limits: {
					xAxis: {
						min: chartData[0].x,
						max: chartData[chartData.length - 1].x,
					},
				},
			},
		},
		elements: {
			line: {
				fill: 'origin',
				borderWidth: 2,
				tension: 0.4,
			},
			point: {
				pointStyle: 'circle',
				pointBackgroundColor: 'transparent',
				pointBorderColor: 'transparent',

				pointHoverRadius: 8,
				pointHoverBorderWidth: 2,
				pointHitRadius: 20,
			},
		},
	};
};
