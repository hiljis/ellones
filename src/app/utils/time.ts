import sub from 'date-fns/sub';
import differenceInDays from 'date-fns/differenceInDays';

type TimeUnit = 'h' | 'd' | 'w' | 'm' | 'y';

export const daysSince = (sinceNum: number, sinceUnit: TimeUnit) => {
	const endDate = new Date();
	let startDate: any;
	if (sinceUnit === 'd') startDate = sub(endDate, { days: sinceNum });
	else if (sinceUnit === 'w') startDate = sub(endDate, { weeks: sinceNum });
	else if (sinceUnit === 'm') startDate = sub(endDate, { months: sinceNum });
	else if (sinceUnit === 'y') startDate = sub(endDate, { years: sinceNum });
	return differenceInDays(endDate, startDate);
};
