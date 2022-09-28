import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChartType, MarketData, TickerError } from '../../app/utils/types';
import { MarketListRowModel } from '../marketList/marketListSlice';
import { RootState } from '../store';

export interface SnapShotChartState {
	timeAgo: number;
	chartType: ChartType;
}
export interface HistoricChartState {
	timeStart: number;
	timeEnd: number;
	chartType: 'bar' | 'line' | 'stacked';
}
export type TickerIncluded = {
	ticker: string;
	included: boolean;
};
export type DominanceStatus = 'idle' | 'loading' | 'failed' | 'success';
export type DominanceDataCategory = 'mCap' | 'volume';
export type DominanceChart = 'snapShot' | 'historic';

export type DominanceState = {
	activeChart: DominanceChart;
	snapShotChartState: SnapShotChartState;
	historicChartState: HistoricChartState;
	dataCategory: DominanceDataCategory;
	tickers: TickerIncluded[];
	status: DominanceStatus;
	errors: string[];
};

const initialState: DominanceState = {
	activeChart: 'snapShot',
	snapShotChartState: { timeAgo: 0, chartType: 'bar' },
	historicChartState: { timeStart: 0, timeEnd: 0, chartType: 'stacked' },
	dataCategory: 'mCap',
	tickers: [],
	status: 'idle',
	errors: [],
};

export const dominanceSlice = createSlice({
	name: 'dominance',
	initialState,
	reducers: {
		toggleActiveChart: (state): void => {
			state.activeChart = state.activeChart === 'snapShot' ? 'historic' : 'snapShot';
		},
		changeDataCategory: (state, action: PayloadAction<DominanceDataCategory>): void => {
			state.dataCategory = action.payload;
		},
		toggleTicker: (state, action: PayloadAction<string>): void => {
			const toggleTicker = action.payload;
			state.tickers = state.tickers.map((ticker) => {
				if (ticker.ticker === toggleTicker) return { ...ticker, included: !ticker.included };
				return ticker;
			});
		},
		loadTickers: (state, action: PayloadAction<string[]>): void => {
			const tickers = action.payload;
			state.tickers = tickers.map((ticker) => {
				return { ticker: ticker, included: true };
			});
		},
	},
});

export const { toggleActiveChart, changeDataCategory, toggleTicker } = dominanceSlice.actions;

export const selectActiveChart = (state: RootState) => {
	return state.dominance.activeChart;
};
export const selectDataCategory = (state: RootState) => {
	return state.dominance.dataCategory;
};
export const selectDominanceStatus = (state: RootState) => {
	return state.dominance.status;
};
export const selectActiveChartState = (state: RootState) => {
	if (state.dominance.activeChart === 'snapShot') return state.dominance.snapShotChartState;
	return state.dominance.historicChartState;
};
export const selectIncludedTickers = (state: RootState) => {
	return state.dominance.tickers;
};

export default dominanceSlice.reducer;
