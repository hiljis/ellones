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
	chartType: ChartType;
}
export type TickerIncluded = {
	ticker: string;
	included: boolean;
};
export type DominanceStatus = 'idle' | 'loading' | 'failed' | 'success';
export type DominanceDataCategory = 'mCap' | 'volume';
export type DominanceChart = 'snapShot' | 'historic';

export type DominanceState = {
	displayMode: 'duo' | 'single';
	isBarChartActive: boolean;
	isDoughnutChartActive: boolean;
	snapShotChartState: SnapShotChartState;
	historicChartState: HistoricChartState;
	dataCategory: DominanceDataCategory;
	tickers: string[];
	excludedTickers: string[];
	status: DominanceStatus;
	errors: string[];
};

const initialState: DominanceState = {
	displayMode: 'duo',
	isBarChartActive: true,
	isDoughnutChartActive: true,
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
		setDisplayMode: (state, action: PayloadAction<'duo' | 'single'>): void => {
			state.displayMode = action.payload;
		},
		toggleChart: (state, action: PayloadAction<string>): void => {
			const chartTarget = action.payload;
			if (chartTarget === 'bar') {
				state.isBarChartActive = !state.isBarChartActive;
			} else {
				state.isDoughnutChartActive = !state.isDoughnutChartActive;
			}
		},
		switchChart: (state): void => {
			state.isBarChartActive = !state.isBarChartActive;
			state.isDoughnutChartActive = !state.isDoughnutChartActive;
		},
		initDuoState: (state): void => {
			state.isBarChartActive = true;
			state.isDoughnutChartActive = true;
		},
		initSingleState: (state): void => {
			state.isBarChartActive = true;
			state.isDoughnutChartActive = false;
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

export const {
	initDominance,
	setDisplayMode,
	toggleChart,
	switchChart,
	initDuoState,
	initSingleState,
	changeDataCategory,
	toggleTicker,
	changeSnapShotTime,
} = dominanceSlice.actions;

export const selectIsChartActive = (state: RootState, targetChart: string) => {
	if (targetChart === 'bar') {
		return state.dominance.isBarChartActive;
	} else {
		return state.dominance.isDoughnutChartActive;
	}
};
export const selectActiveChart = (state: RootState) => {
	if (state.dominance.isBarChartActive) return 'bar';
	return 'doughnut';
};
export const selectDataCategory = (state: RootState) => {
	return state.dominance.dataCategory;
};
export const selectDominanceStatus = (state: RootState) => {
	return state.dominance.status;
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
export const selectDominanceDisplayMode = (state: RootState) => {
	return state.dominance.displayMode;
};

export default dominanceSlice.reducer;
