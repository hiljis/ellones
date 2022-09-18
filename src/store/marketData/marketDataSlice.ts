import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface MarketDataPoint {
	x: number;
	y: number;
}

export interface MarketData {
	priceHistory: MarketDataPoint[];
	volumeHistory: MarketDataPoint[];
	marketCapHistory: MarketDataPoint[];
}

export interface MarketDataWithState {
	data: MarketData;
	status: 'idle' | 'loading' | 'failed' | 'success';
	error: string;
}

export interface MarketDataError {
	ticker: string;
	error: string;
}

export type MarketDataState = {
	[index: string]: MarketDataWithState | boolean | MarketDataError[];
	isLoading: boolean;
	errors: MarketDataError[];
};

const initialState: MarketDataState = {
	isLoading: false,
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
			};
			state.isLoading = true;
		},
		fetchMarketDataSuccess: (state, action: PayloadAction<{ ticker: string; data: MarketData }>) => {
			state.isLoading = false;
			const { ticker, data } = action.payload;
			state[ticker] = { data: data, status: 'success', error: '' };
		},
		fetchMarketDataFailed: (state, action: PayloadAction<MarketDataError>) => {
			const { ticker, error } = action.payload;
			state.isLoading = false;
			state.errors.push(action.payload);
			state[ticker] = {
				data: { priceHistory: [], marketCapHistory: [], volumeHistory: [] },
				status: 'failed',
				error: error,
			};
		},
	},
});

export const { fetchMarketData, fetchMarketDataSuccess, fetchMarketDataFailed } = marketDataSlice.actions;

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
export const selectMarketDataStatus = (state: RootState, ticker: string) => {
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketDataWithState;
	return marketData.status;
};

export default marketDataSlice.reducer;
