import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketData, MarketDataPoint, TickerError } from '../../app/utils/types';
import { MarketListRowModel } from '../marketList/marketListSlice';
import { RootState } from '../store';

export interface MarketDataWithState {
	ticker: string;
	priceHistory: MarketDataPoint[];
	mCapHistory: MarketDataPoint[];
	volumeHistory: MarketDataPoint[];
	change: MarketListRowModel | null;
	status: 'idle' | 'loading' | 'failed' | 'success' | 'calc-failed' | 'calc-complete';
	error: string;
}

export type MarketDataStatus = 'idle' | 'loading' | 'failed' | 'loadComplete';

export type MarketDataState = {
	data: MarketDataWithState[];
	status: MarketDataStatus;
	numOfProfiles: number;
	errors: TickerError[];
};

const initialState: MarketDataState = {
	data: [],
	status: 'idle',
	numOfProfiles: 0,
	errors: [],
};

export const marketDataSlice = createSlice({
	name: 'marketData',
	initialState,
	reducers: {
		setNumOfProfiles: (state, action: PayloadAction<number>) => {
			state.numOfProfiles = action.payload;
		},
		fetchMarketData: (state, action: PayloadAction<{ ticker: string }>) => {
			const { ticker } = action.payload;

			if (state.data.find((element) => element.ticker === ticker)) {
				state.data = state.data.map((element) => {
					if (element.ticker === ticker)
						return {
							ticker,
							priceHistory: [],
							mCapHistory: [],
							volumeHistory: [],
							status: 'loading',
							error: '',
							change: null,
						};
					return element;
				});
			} else {
				state.data.push({
					ticker,
					priceHistory: [],
					mCapHistory: [],
					volumeHistory: [],
					status: 'loading',
					error: '',
					change: null,
				});
			}
			state.status = 'loading';
		},
		fetchMarketDataSuccess: (state, action: PayloadAction<MarketData>) => {
			const { ticker, priceHistory, mCapHistory, volumeHistory } = action.payload;

			if (state.data.find((element) => element.ticker === ticker)) {
				state.data = state.data.map((element) => {
					if (element.ticker === ticker)
						return {
							ticker,
							priceHistory,
							mCapHistory,
							volumeHistory,
							status: 'success',
							error: '',
							change: null,
						};
					return element;
				});
			} else {
				state.data.push({
					ticker: ticker,
					priceHistory,
					mCapHistory,
					volumeHistory,
					status: 'success',
					error: '',
					change: null,
				});
			}
			state.status = state.data.length === state.numOfProfiles ? 'loadComplete' : 'idle';
		},
		fetchMarketDataFailed: (state, action: PayloadAction<TickerError>) => {
			state.status = 'failed';
			state.errors.push(action.payload);
		},
		fetchMarketDataForProfiles: (state, action: PayloadAction<{ tickers: string[] }>) => {
			state.numOfProfiles = action.payload.tickers.length;
			state.status = 'loading';
		},
		fetchMarketDataForProfilesSuccess: (state, action: PayloadAction<MarketData[]>) => {
			const marketDataArr = action.payload;
			state.data = [];
			marketDataArr.forEach(({ ticker, priceHistory, mCapHistory, volumeHistory }) => {
				state.data.push({
					ticker,
					priceHistory,
					mCapHistory,
					volumeHistory,
					status: 'success',
					error: '',
					change: null,
				});
			});
			state.status = state.data.length === state.numOfProfiles ? 'loadComplete' : 'idle';
		},
		fetchMarketDataForProfilesFailed: (state, action: PayloadAction<TickerError[]>) => {
			state.status = 'failed';
			state.errors.push(...action.payload);
		},
		calcChangeDataAfterFetchSuccess: (state, action: PayloadAction<{ ticker: string; data: MarketData }[]>) => {},
		calcChangeDataSuccess: (state, action: PayloadAction<MarketListRowModel>) => {
			const { ticker } = action.payload;
			state.data = state.data.map((element) => {
				if (element.ticker === ticker)
					return { ...element, change: { ...action.payload }, status: 'calc-complete' };
				return element;
			});
		},
		calcChangeDataFailed: (state, action: PayloadAction<{ ticker: string; error: string }>) => {
			const { ticker, error } = action.payload;
			state.data = state.data.map((element) => {
				if (element.ticker === ticker) return { ...element, status: 'calc-failed', error };
				return element;
			});
		},
	},
});

export const {
	fetchMarketData,
	fetchMarketDataSuccess,
	fetchMarketDataFailed,
	fetchMarketDataForProfiles,
	fetchMarketDataForProfilesSuccess,
	fetchMarketDataForProfilesFailed,
	calcChangeDataAfterFetchSuccess,
	calcChangeDataSuccess,
	calcChangeDataFailed,
} = marketDataSlice.actions;

export const selectMarketData = (state: RootState, ticker: string) => {
	const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	if (!marketData) return null;
	if (!marketData.priceHistory.length) return null;
	return marketData;
};

export const selectPriceHistory = (state: RootState, ticker: string) => {
	const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	if (!marketData) return null;
	if (!marketData.priceHistory.length) return null;
	return marketData.priceHistory;
};
export const selectVolumeHistory = (state: RootState, ticker: string) => {
	const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	if (!marketData) return null;
	if (!marketData.volumeHistory.length) return null;
	return marketData.volumeHistory;
};
export const selectMCapHistory = (state: RootState, ticker: string) => {
	const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	if (!marketData) return null;
	if (!marketData.mCapHistory.length) return null;
	return marketData.mCapHistory;
};
export const selectMarketDataStatus = (state: RootState) => {
	return state.marketData.status;
};
export const selectMarketDataTickerStatus = (state: RootState, ticker: string) => {
	const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	if (!marketData) return null;
	return marketData.status;
};
export const selectChangeDataByTicker = (state: RootState, ticker: string) => {
	const marketData = state.marketData.data.filter((element) => element.ticker === ticker)[0];
	if (!marketData) return null;
	if (marketData.status !== 'calc-complete') return null;
	return marketData.change;
};
export const selectMarketDataByIndex = (state: RootState, dataTarget: string, index: number) => {
	if (!state.marketData.data.length) return null;
	return state.marketData.data.map((element) => {
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
