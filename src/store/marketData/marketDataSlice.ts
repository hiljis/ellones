import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketData, TickerError } from '../../app/utils/types';
import { MarketListRowModel } from '../marketList/marketListSlice';
import { RootState } from '../store';

export interface MarketDataWithState {
	data: MarketData;
	change: MarketListRowModel | null;
	status: 'idle' | 'loading' | 'failed' | 'success' | 'calc-failed' | 'calc-complete';
	error: string;
}

export type MarketDataStatus = 'idle' | 'loading' | 'failed' | 'loadComplete';

export type MarketDataState = {
	[index: string]: MarketDataWithState | MarketDataStatus | TickerError[];
	status: MarketDataStatus;
	errors: TickerError[];
};

const initialState: MarketDataState = {
	status: 'idle',
	errors: [],
};

export const marketDataSlice = createSlice({
	name: 'marketData',
	initialState,
	reducers: {
		fetchMarketData: (state, action: PayloadAction<{ ticker: string }>) => {
			const { ticker } = action.payload;
			state[ticker] = {
				data: { priceHistory: [], marketCapHistory: [], volumeHistory: [] },
				status: 'loading',
				error: '',
				change: null,
			};
			state.status = 'loading';
		},
		fetchMarketDataSuccess: (state, action: PayloadAction<{ ticker: string; data: MarketData }>) => {
			state.status = 'idle';
			const { ticker, data } = action.payload;
			state[ticker] = { data: data, status: 'success', error: '', change: null };
		},
		fetchMarketDataFailed: (state, action: PayloadAction<TickerError>) => {
			const { ticker, error } = action.payload;
			state.status = 'idle';
			state.errors.push(action.payload);
			state[ticker] = {
				data: { priceHistory: [], marketCapHistory: [], volumeHistory: [] },
				status: 'failed',
				error: error,
				change: null,
			};
		},
		fetchMarketDataForProfiles: (state, action: PayloadAction<{ tickers: string[] }>) => {
			state.status = 'loading';
		},
		fetchMarketDataForProfilesSuccess: (state, action: PayloadAction<{ ticker: string; data: MarketData }[]>) => {
			const marketDataArr = action.payload;
			marketDataArr.forEach((marketData) => {
				state[marketData.ticker] = { data: marketData.data, status: 'success', error: '', change: null };
			});
			state.status = 'loadComplete';
		},
		fetchMarketDataForProfilesFailed: (state, action: PayloadAction<TickerError[]>) => {
			state.status = 'failed';
			state.errors.push(...action.payload);
		},
		calcChangeDataAfterFetchSuccess: (state, action: PayloadAction<{ ticker: string; data: MarketData }[]>) => {},
		calcChangeDataSuccess: (state, action: PayloadAction<MarketListRowModel>) => {
			const { ticker } = action.payload;
			const tickerState = state[ticker] as MarketDataWithState;
			tickerState.change = { ...action.payload };
			tickerState.status = 'calc-complete';
			// state[ticker] = {...state[ticker], change: {...action.payload}, status: 'calc-complete' };
		},
		calcChangeDataFailed: (state, action: PayloadAction<{ ticker: string; error: string }>) => {
			const { ticker, error } = action.payload;
			const tickerState = state[ticker] as MarketDataWithState;
			tickerState.status = 'calc-failed';
			tickerState.error = error;
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
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketDataWithState;
	return marketData.data;
};

export const selectPriceHistory = (state: RootState, ticker: string) => {
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketDataWithState;
	if (!marketData.data.priceHistory.length) return null;
	return marketData.data.priceHistory;
};
export const selectVolumeHistory = (state: RootState, ticker: string) => {
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketDataWithState;
	if (!marketData.data.volumeHistory.length) return null;
	return marketData.data.volumeHistory;
};
export const selectMCapHistory = (state: RootState, ticker: string) => {
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketDataWithState;
	if (!marketData.data.marketCapHistory.length) return null;
	return marketData.data.marketCapHistory;
};
export const selectMarketDataStatus = (state: RootState) => {
	return state.marketData.status;
};
export const selectMarketDataTickerStatus = (state: RootState, ticker: string) => {
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketDataWithState;
	return marketData.status;
};
export const selectUnloadedTickers = (state: RootState): string[] => {
	const profileTickers = state.profiles.profiles.map((profile) => profile.ticker);
	const unloadedTickers = profileTickers.filter((ticker) => !state.marketData[ticker]);
	return unloadedTickers;
};
export const selectChangeDataByTicker = (state: RootState, ticker: string) => {
	const marketData = state.marketData[ticker] as MarketDataWithState;
	if (!marketData) return null;
	if (marketData.status !== 'calc-complete') return null;
	return marketData.change;
};

export default marketDataSlice.reducer;
