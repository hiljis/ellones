export const getMCapTooltip = (data: any) => {
	const floatVal = parseFloat(data.formattedValue.replace(',', ''));
	const currencyStr = floatVal.toLocaleString('en-US', {
		maximumFractionDigits: 0,
		style: 'currency',
		currency: 'USD',
	});
	console.log(data);
	return `${data.label}: ${currencyStr}`;
};

export const getVolumeTooltip = (data: any) => {
	const floatVal = parseFloat(data.formattedValue.replace(',', ''));
	const currencyStr = floatVal.toLocaleString('en-US', {
		maximumFractionDigits: 0,
		style: 'currency',
		currency: 'USD',
	});
	console.log(data);
	return `${data.label}: ${currencyStr}`;
};

export const getPriceTooltip = (data: any) => {
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
