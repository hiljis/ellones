const THOUSAND = 1000;
const MILLION = 1000000;
const BILLION = 1000000000;
const TRILLION = 1000000000000;

export const capFirst = (string: string): string => {
	return string[0].toUpperCase().concat(string.slice(1, string.length));
};

export const removeHttps = (url: string): string => {
	return url.split('https://')[1];
};

export const formatNumberAndExtractUnit = (num: number): { number: string; unit: string } => {
	if (num >= TRILLION) return { number: (num / TRILLION).toFixed(2), unit: 'T' };
	else if (num >= BILLION) return { number: (num / BILLION).toFixed(2), unit: 'B' };
	else if (num >= MILLION) return { number: (num / MILLION).toFixed(2), unit: 'M' };
	else if (num >= THOUSAND) return { number: (num / THOUSAND).toFixed(2), unit: 'K' };
	return { number: num.toFixed(2), unit: '' };
};

export const format = (tps: number): { tps: number; unit: string } => {
	if (tps >= 1000) return { tps: Math.round(tps / 1000), unit: 'K' };
	return { tps: tps, unit: '' };
};

export const dateToYYYYMMDD = (date: Date) => {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
};
