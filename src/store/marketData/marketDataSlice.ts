import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface MarketData {
	priceHistory: [];
	volumeHistory: [];
	marketCapHistory: [];
}

export interface MarketDataError {
	ticker: string;
	error: string;
}

export type MarketDataState = {
	[index: string]: MarketData | boolean | MarketDataError[];
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
			state.isLoading = true;
		},
		fetchMarketDataSuccess: (state, action: PayloadAction<{ ticker: string; data: MarketData }>) => {
			state.isLoading = false;
			const { ticker, data } = action.payload;
			state[ticker] = data;
		},
		fetchMarketDataFailed: (state, action: PayloadAction<MarketDataError>) => {
			state.isLoading = false;
			state.errors.push(action.payload);
		},
	},
});

export const { fetchMarketData, fetchMarketDataSuccess, fetchMarketDataFailed } = marketDataSlice.actions;

export const selectPriceHistory = (state: RootState, ticker: string) => {
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketData;
	return marketData.priceHistory;
};
export const selectVolumeHistory = (state: RootState, ticker: string) => {
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketData;
	return marketData.volumeHistory;
};
export const selectMCapHistory = (state: RootState, ticker: string) => {
	if (!state.marketData[ticker]) return null;
	const marketData = state.marketData[ticker] as MarketData;
	return marketData.marketCapHistory;
};

export default marketDataSlice.reducer;
