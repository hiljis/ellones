export interface MarketDataPoint {
	x: number;
	y: number;
}

export interface MarketData {
	ticker: string;
	priceHistory: MarketDataPoint[];
	volumeHistory: MarketDataPoint[];
	mCapHistory: MarketDataPoint[];
}

export interface TickerError {
	ticker: string;
	error: string;
}

export type TickerStatus =
	| 'idle'
	| 'load-waiting'
	| 'loading'
	| 'load-failed'
	| 'load-success'
	| 'calculating'
	| 'calc-failed'
	| 'calc-success';

export interface IndexError {
	index: number;
	error: string;
}

export interface User {
	uid: string;
	username: string;
	email: string;
	gender: string;
	age: string;
	occupation: string;
	password?: string;
	createdAt?: number;
	favChain: string;
	avatarColor: string;
}

export interface UserSignIn {
	email: string;
	password: string;
}

export interface UserSignUp {
	username: string;
	email: string;
	gender: string;
	age: string | number;
	occupation: string;
	password: string;
}

export type ChartType = 'line' | 'bar' | 'doughnut';
