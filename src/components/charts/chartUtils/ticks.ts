export const getMCapTick = (value: number) => {
	let str = '';
	if (value >= 1000000000) str = `${(value / 1000000000).toFixed(0)} B`;
	else if (value >= 1000000) str = `${(value / 1000000).toFixed(0)} M`;
	else if (value >= 1000) str = `${(value / 1000).toFixed(0)} K`;
	else str = `${value.toFixed(0)}`;
	return str.padEnd(6, ' ');
};

export const getVolumeTick = (value: number) => {
	let str = '';
	if (value >= 1000000000) str = `${(value / 1000000000).toFixed(0)} B`;
	else if (value >= 1000000) str = `${(value / 1000000).toFixed(0)} M`;
	else if (value >= 1000) str = `${(value / 1000).toFixed(0)} K`;
	else str = `${value.toFixed(0)}`;
	return str.padEnd(6, ' ');
};

export const getPriceTick = (value: number) => {
	if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} B`;
	if (value >= 1000000) return `${(value / 1000000).toFixed(1)} M`;
	if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
	return `${value.toFixed(0)}`;
};
