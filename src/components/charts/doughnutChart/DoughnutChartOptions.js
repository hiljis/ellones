export const getDoughnutChartOptions = (chartData, dataCategory) => {
	return {
		responsive: true,
		maintainAspectRatio: true,
		parsing: false,
		// animation: true,
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
					// title: (data) => {
					// 	const dataPointLabel = data[0].label;
					// 	const [date, year] = dataPointLabel.split(',');
					// 	return `${date}, ${year}`;
					// },
					label: (data) => {
						if (dataCategory === 'mCap') return getMCapTooltip(data);
						if (dataCategory === 'volume') return getVolumeTooltip(data);
						return getMCapTooltip(data);
					},
				},
			},
		},
	};
};

const getMCapTooltip = (data) => {
	const floatVal = parseFloat(data.formattedValue.replace(',', ''));
	const currencyStr = floatVal.toLocaleString('en-US', {
		maximumFractionDigits: 0,
		style: 'currency',
		currency: 'USD',
	});
	console.log(data);
	return `${data.label}: ${currencyStr}`;
};

const getVolumeTooltip = (data) => {
	const floatVal = parseFloat(data.formattedValue.replace(',', ''));
	const currencyStr = floatVal.toLocaleString('en-US', {
		maximumFractionDigits: 0,
		style: 'currency',
		currency: 'USD',
	});
	console.log(data);
	return `${data.label}: ${currencyStr}`;
};

const getPriceTooltip = (data) => {
	const floatVal = parseFloat(data.formattedValue.replace(',', ''));
	const numOfDecimals = floatVal < 1 ? 3 : 2;
	const currencyStr = floatVal.toLocaleString('en-US', {
		maximumFractionDigits: numOfDecimals,
		style: 'currency',
		currency: 'USD',
	});
	console.log(data);
	return `${data.label}: ${currencyStr}`;
};
