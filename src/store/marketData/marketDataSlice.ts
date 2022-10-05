import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../../app/Data/Data';
import { tickers } from '../../app/utils/tickers';
import { MarketData, MarketDataPoint, TickerError, TickerStatus } from '../../app/utils/types';
import { MarketListRowModel } from '../marketList/marketListSlice';
import { RootState } from '../store';

export interface MarketDataWithState {
	ticker: string;
	priceHistory: MarketDataPoint[];
	mCapHistory: MarketDataPoint[];
	volumeHistory: MarketDataPoint[];
	change: MarketListRowModel | null;
	status: 'idle' | 'loading' | 'load-success' | 'load-failed';
	error: string;
}

export type MarketDataStatus =
	| 'idle'
	| 'loading'
	| 'load-failed'
	| 'load-complete'
	| 'load-incomplete'
	| 'load-failed-still-loading';

export type MarketDataState = {
	tickerStatus: { [ticker: string]: TickerStatus };
	fetchQueue: string[];
	status: MarketDataStatus;
	size: number;
	errors: TickerError[];
};

const initialState: MarketDataState = {
	tickerStatus: {},
	fetchQueue: [],
	status: 'idle',
	size: 0,
	errors: [],
};

export const marketDataSlice = createSlice({
	name: 'marketData',
	initialState,
	reducers: {
		initMarketDataTickers: (state, action: PayloadAction<string[]>) => {
			const tickers = action.payload;
			tickers.forEach((ticker) => {
				state.tickerStatus[ticker] = 'idle';
				Data.marketData.set(ticker, { ticker: ticker, priceHistory: [], volumeHistory: [], mCapHistory: [] });
			});
			state.size = tickers.length;
		},
		fetchTickerStart: (state, action: PayloadAction<string>) => {
			const ticker = action.payload;

			if (!state.fetchQueue.includes(ticker) && state.tickerStatus[ticker] !== 'load-success') {
				state.fetchQueue.unshift(ticker);
				state.tickerStatus[ticker] = 'load-waiting';
				if (state.fetchQueue.length === 1) {
					state.tickerStatus[ticker] = 'loading';
				}
			}
			state.status = 'loading';
		},
		fetchTickerStop: (state, action: PayloadAction<string>) => {
			const ticker = action.payload;
			state.tickerStatus[ticker] = 'idle';
			state.fetchQueue = state.fetchQueue.filter((tickerInQueue) => tickerInQueue !== ticker);
			if (state.fetchQueue.length === 0) state.status = 'load-incomplete';
		},
		fetchTickerFailed: (state, action: PayloadAction<TickerError>) => {
			const { ticker } = action.payload;
			state.tickerStatus[ticker] = 'load-failed';
			state.fetchQueue = state.fetchQueue.filter((tickerInQueue) => tickerInQueue !== ticker);
			state.errors.push(action.payload);
			state.status = 'load-failed-still-loading';
			if (state.fetchQueue.length > 0) {
				const nextTicker = state.fetchQueue[state.fetchQueue.length - 1];
				state.tickerStatus[nextTicker] = 'loading';
			}
		},
		fetchTickerSuccess: (state, action: PayloadAction<MarketData>) => {
			const { ticker } = action.payload;
			Data.marketData.set(ticker, action.payload);
			state.tickerStatus[ticker] = 'load-success';
			state.fetchQueue = state.fetchQueue.filter((queueTicker) => queueTicker !== ticker);
			if (state.fetchQueue.length > 0) {
				const nextTicker = state.fetchQueue[state.fetchQueue.length - 1];
				state.tickerStatus[nextTicker] = 'loading';
			}

			const values = Object.values(state.tickerStatus);
			state.status =
				values.filter((value) => value !== 'load-success').length === 0 ? 'load-complete' : state.status;
			if (state.status === 'load-complete') state.fetchQueue = [];
		},
		fetchTickerReset: (state, action: PayloadAction<string>) => {
			const ticker = action.payload;
			state.tickerStatus[ticker] = 'idle';
			state.fetchQueue = state.fetchQueue.filter((tickerInQueue) => tickerInQueue !== ticker);
			state.status = 'load-incomplete';
		},
		fetchAllStart: (state) => {
			const tickersToFetch = Object.keys(state.tickerStatus).filter((ticker) => {
				if (state.tickerStatus[ticker] !== 'load-success' && state.tickerStatus[ticker] !== 'loading') {
					state.tickerStatus[ticker] = 'load-waiting';
					return true;
				}
				return false;
			});
			state.fetchQueue.unshift(...tickersToFetch);
			const nextTicker = state.fetchQueue[state.fetchQueue.length - 1];
			state.tickerStatus[nextTicker] = 'loading';

			state.status = 'loading';
		},
		fetchAllStop: (state) => {
			state.fetchQueue = [];
			Object.keys(state.tickerStatus).forEach((ticker) => {
				if (state.tickerStatus[ticker] === 'loading' || state.tickerStatus[ticker] === 'load-waiting') {
					state.tickerStatus[ticker] = 'idle';
				}
			});
			const values = Object.values(state.tickerStatus);
			state.status =
				values.filter((value) => value !== 'load-success').length === 0 ? 'load-complete' : 'load-incomplete';
		},
		fetchAllReset: (state) => {
			state.fetchQueue = [];
			Object.keys(state.tickerStatus).forEach((ticker) => {
				if (state.tickerStatus[ticker] !== 'load-success') {
					state.tickerStatus[ticker] = 'idle';
				}
			});
			state.status = 'load-incomplete';
		},
		fetchAllSuccess: (state) => {
			const values = Object.values(state.tickerStatus);
			state.status =
				values.filter((value) => value !== 'load-success').length === 0 ? 'load-complete' : 'load-incomplete';
		},
		fetchAllFailed: (state, action: PayloadAction<string>) => {
			Object.keys(state.tickerStatus).forEach((ticker) => {
				if (state.tickerStatus[ticker] === 'loading') state.tickerStatus[ticker] = 'load-failed';
			});
			state.fetchQueue = [];
			state.errors.push({ ticker: '', error: action.payload });

			state.status = 'load-failed';
		},
	},
});

export const {
	initMarketDataTickers,
	fetchTickerStart,
	fetchTickerStop,
	fetchTickerFailed,
	fetchTickerSuccess,
	fetchTickerReset,
	fetchAllStart,
	fetchAllStop,
	fetchAllSuccess,
	fetchAllFailed,
	fetchAllReset,
} = marketDataSlice.actions;

export const selectMarketData = (state: RootState, ticker: string) => {
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return null;
	if (!marketData.priceHistory.length) return null;
	return marketData;
};

export const selectPriceHistory = (state: RootState, ticker: string) => {
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return null;
	if (!marketData.priceHistory.length) return null;
	return marketData.priceHistory;
};
export const selectVolumeHistory = (state: RootState, ticker: string) => {
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return null;
	if (!marketData.volumeHistory.length) return null;
	return marketData.volumeHistory;
};
export const selectMCapHistory = (state: RootState, ticker: string) => {
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return null;
	if (!marketData.mCapHistory.length) return null;
	return marketData.mCapHistory;
};
export const selectMarketDataStatus = (state: RootState) => {
	return state.marketData.status;
};
export const selectMarketDataStatusByTicker = (state: RootState, ticker: string) => {
	const status = state.marketData.tickerStatus[ticker];
	return status;
};
export const selectMarketDataByIndex = (state: RootState, dataTarget: string, index: number) => {
	const marketData = Array.from(Data.marketData.values());
	return marketData.map((element) => {
		let data = { x: -1, y: 0 };
		if (dataTarget === 'price') {
			const length = element.priceHistory.length;
			data = length - 1 >= index ? element.priceHistory[length - (1 + index)] : { x: -1, y: 0 };
		}
		if (dataTarget === 'mCap') {
			const length = element.mCapHistory.length;
			data = length - 1 >= index ? element.mCapHistory[length - (1 + index)] : { x: -1, y: 0 };
		}
		if (dataTarget === 'volume') {
			const length = element.volumeHistory.length;
			data = length - 1 >= index ? element.volumeHistory[length - (1 + index)] : { x: -1, y: 0 };
		}
		return { ticker: element.ticker, data: data };
	});
};
export const selectFetchQueue = (state: RootState) => {
	return state.marketData.fetchQueue;
};

export default marketDataSlice.reducer;
