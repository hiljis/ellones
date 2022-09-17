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

export const formatNumberAndExtractUnit = (num: number): { number: number; unit: string } => {
	if (num >= TRILLION) return { number: Math.round(num / TRILLION), unit: 'T' };
	else if (num >= BILLION) return { number: Math.round(num / BILLION), unit: 'B' };
	else if (num >= MILLION) return { number: Math.round(num / MILLION), unit: 'M' };
	else if (num >= THOUSAND) return { number: Math.round(num / THOUSAND), unit: 'K' };
	return { number: num, unit: '' };
};

export const format = (tps: number): { tps: number; unit: string } => {
	if (tps >= 1000) return { tps: Math.round(tps / 1000), unit: 'K' };
	return { tps: tps, unit: '' };
};
