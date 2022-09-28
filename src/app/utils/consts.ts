import { daysSince, daysSinceDate } from './time';

export const BTC_GENESIS = '2009-01-03';
export const BTC_MARKET_DATA_START = '2013-04-28';
export const DAYS_SINCE_BTC_GENESIS = daysSinceDate(new Date(BTC_GENESIS));
export const DAYS_SINCE_BTC_MARKET_DATA_START = daysSinceDate(new Date(BTC_MARKET_DATA_START));
export const DAYS_24H_BACK = 1;
export const DAYS_1W_BACK = 7;
export const DAYS_1M_BACK = daysSince(1, 'm');
export const DAYS_3M_BACK = daysSince(3, 'm');
export const DAYS_6M_BACK = daysSince(6, 'm');
export const DAYS_1Y_BACK = daysSince(1, 'y');
export const DAYS_2Y_BACK = daysSince(2, 'y');
export const DAYS_3Y_BACK = daysSince(3, 'y');
export const DAYS_4Y_BACK = daysSince(4, 'y');
export const DAYS_5Y_BACK = daysSince(5, 'y');
