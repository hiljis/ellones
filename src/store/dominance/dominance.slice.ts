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
	tickers: string[];
	excludedTickers: string[];
	status: DominanceStatus;
	errors: string[];
};

const initialState: DominanceState = {
	activeChart: 'snapShot',
	snapShotChartState: { timeAgo: 0, chartType: 'bar' },
	historicChartState: { timeStart: 0, timeEnd: 0, chartType: 'stacked' },
	dataCategory: 'mCap',
	tickers: [],
	excludedTickers: [],
	status: 'idle',
	errors: [],
};

export const dominanceSlice = createSlice({
	name: 'dominance',
	initialState,
	reducers: {
		initDominance: (state, action: PayloadAction<string[]>): void => {
			const tickers = action.payload;
			state.tickers = [...tickers];
		},
		toggleActiveChart: (state): void => {
			state.activeChart = state.activeChart === 'snapShot' ? 'historic' : 'snapShot';
		},
		changeDataCategory: (state, action: PayloadAction<DominanceDataCategory>): void => {
			state.dataCategory = action.payload;
		},
		toggleTicker: (state, action: PayloadAction<string>): void => {
			const toggleTicker = action.payload;
			if (state.excludedTickers.includes(toggleTicker)) {
				state.excludedTickers = state.excludedTickers.filter(
					(excludedTicker) => excludedTicker !== toggleTicker
				);
			} else {
				state.excludedTickers.push(toggleTicker);
			}
		},
		changeSnapShotTime: (state, action: PayloadAction<number>): void => {
			state.snapShotChartState = { ...state.snapShotChartState, timeAgo: action.payload };
		},
	},
});

export const { initDominance, toggleActiveChart, changeDataCategory, toggleTicker, changeSnapShotTime } =
	dominanceSlice.actions;

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
export const selectDominanceExcludedTickers = (state: RootState) => {
	return state.dominance.excludedTickers;
};
export const selectDominanceTickers = (state: RootState) => {
	return state.dominance.tickers;
};
export const selectDominanceIsActiveTicker = (state: RootState, ticker: string) => {
	return !state.dominance.excludedTickers.includes(ticker);
};

export default dominanceSlice.reducer;
