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

export type MarketDataStatus = 'idle' | 'loading' | 'load-failed' | 'load-complete' | 'load-incomplete';

export type MarketDataState = {
	tickerStatus: { [ticker: string]: TickerStatus };
	status: MarketDataStatus;
	size: number;
	errors: TickerError[];
};

const initialState: MarketDataState = {
	tickerStatus: {},
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
		fetchMarketData: (state, action: PayloadAction<{ ticker: string }>) => {
			const { ticker } = action.payload;

			state.tickerStatus[ticker] = 'loading';
			state.status = 'loading';
		},
		fetchMarketDataSuccess: (state, action: PayloadAction<MarketData>) => {
			const { ticker } = action.payload;
			Data.marketData.set(ticker, action.payload);
			state.tickerStatus[ticker] = 'load-success';

			const values = Object.values(state.tickerStatus);
			state.status =
				values.filter((value) => value !== 'load-success').length === 0 ? 'load-complete' : 'load-incomplete';
		},
		fetchMarketDataFailed: (state, action: PayloadAction<TickerError>) => {
			state.errors.push(action.payload);
			const { ticker, error } = action.payload;
			state.tickerStatus[ticker] = 'load-failed';
			Object.keys(state.tickerStatus).forEach((ticker) => {
				if (state.tickerStatus[ticker] !== 'load-success') state.tickerStatus[ticker] = 'load-failed';
			});
			state.status = 'load-failed';
		},
		fetchMarketDataForProfiles: (state, action: PayloadAction<{ tickers: string[] }>) => {
			const { tickers } = action.payload;
			tickers.forEach((ticker) => (state.tickerStatus[ticker] = 'load-waiting'));
			state.status = 'loading';
		},
		fetchMarketDataForProfilesSuccess: (state, action: PayloadAction<MarketData[]>) => {
			action.payload.forEach(({ ticker, priceHistory, mCapHistory, volumeHistory }) => {
				state.tickerStatus[ticker] = 'load-success';
				Data.marketData.set(ticker, { ticker, priceHistory, mCapHistory, volumeHistory });
			});
			const values = Object.values(state.tickerStatus);
			state.status =
				values.filter((value) => value !== 'load-success').length === 0 ? 'load-complete' : 'load-incomplete';
		},
		fetchMarketDataForProfilesFailed: (
			state,
			action: PayloadAction<{ failedTickers: string[]; error: TickerError }>
		) => {
			const { failedTickers, error } = action.payload;
			console.log('FAILED!', failedTickers);
			state.status = 'load-failed';
			state.errors.push(error);
			failedTickers.forEach((ticker) => {
				if (state.tickerStatus[ticker] === 'idle') state.tickerStatus[ticker] = 'load-failed';
			});
		},
		setStatusToIncomplete: (state) => {
			state.status = 'load-incomplete';
		}
	},
});

export const {
	initMarketDataTickers,
	fetchMarketData,
	fetchMarketDataSuccess,
	fetchMarketDataFailed,
	fetchMarketDataForProfiles,
	fetchMarketDataForProfilesSuccess,
	fetchMarketDataForProfilesFailed,
	setStatusToIncomplete,
} = marketDataSlice.actions;

export const selectMarketData = (state: RootState, ticker: string) => {
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return null;
	if (!marketData.priceHistory.length) return null;
	return marketData;
};

export const selectPriceHistory = (state: RootState, ticker: string) => {
	// const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	// if (!marketData) return null;
	// if (!marketData.priceHistory.length) return null;
	// return marketData.priceHistory;
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return null;
	if (!marketData.priceHistory.length) return null;
	return marketData.priceHistory;
};
export const selectVolumeHistory = (state: RootState, ticker: string) => {
	// const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	// if (!marketData) return null;
	// if (!marketData.volumeHistory.length) return null;
	// return marketData.volumeHistory;
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return null;
	if (!marketData.volumeHistory.length) return null;
	return marketData.volumeHistory;
};
export const selectMCapHistory = (state: RootState, ticker: string) => {
	// const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	// if (!marketData) return null;
	// if (!marketData.mCapHistory.length) return null;
	// return marketData.mCapHistory;
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return null;
	if (!marketData.mCapHistory.length) return null;
	return marketData.mCapHistory;
};
export const selectMarketDataStatus = (state: RootState) => {
	return state.marketData.status;
};
export const selectMarketDataStatusByTicker = (state: RootState, ticker: string) => {
	// const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	// if (!marketData) return null;
	// if (!marketData) return null;
	// return marketData.status;
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

export default marketDataSlice.reducer;
