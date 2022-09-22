export interface MarketDataPoint {
	x: number;
	y: number;
}

export interface MarketData {
	priceHistory: MarketDataPoint[];
	volumeHistory: MarketDataPoint[];
	marketCapHistory: MarketDataPoint[];
}

export interface TickerError {
	ticker: string;
	error: string;
}

export type ChangeData = {
	'24h': number;
	'1w': number;
	'1m': number;
	'3m': number;
	'6m': number;
	'1y': number;
	'3y': number;
	range: number;
};

export interface User {
	uid?: string;
	username?: string;
	email: string;
	gender?: string;
	age?: string;
	occupation?: string;
	password?: string;
	createdAt?: number;
}

export interface UserSignUp {
	username: string;
	email: string;
	gender: string;
	age: number;
	occupation: string;
	password: string;
}
