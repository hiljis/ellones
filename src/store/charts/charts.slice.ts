import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../../app/Data/Data';
import { DAYS_1M_BACK } from '../../app/utils/consts';
import { IndexError, MarketDataPoint, TickerError } from '../../app/utils/types';
import { RootState } from '../store';

export type ChartDataCategory = 'price' | 'mCap' | 'volume' | 'tvl';
export type DisplayMode = 'default' | 'max' | 'coll';
export type ScaleType = 'linear' | 'logarithmic';
export type ChartResolution = 1 | 2 | 3 | 5 | 10;

export interface Chart {
	dataCategory: ChartDataCategory;
	timeSpan: number;
	ticker: string;
	resolution: number;
	scale: string;
	displayMode: DisplayMode;
	status: 'idle' | 'loading' | 'load-complete' | 'load-failed' | 'calculating' | 'calc-complete' | 'calc-failed';
}

export type ChartsState = {
	charts: Chart[];
	status: 'idle' | 'loading' | 'failed' | 'success';
	errors: TickerError[];
};

const initialState: ChartsState = {
	charts: [],
	status: 'idle',
	errors: [],
};

export const chartsSlice = createSlice({
	name: 'charts',
	initialState,
	reducers: {
		addNewInitChart: (state): void => {
			const chart: Chart = {
				status: 'idle',
				dataCategory: 'mCap',
				ticker: '',
				resolution: 1,
				scale: 'linear',
				timeSpan: DAYS_1M_BACK,
				displayMode: 'default',
			};
			state.charts.push(chart);
			Data.charts.push([]);
		},
		deleteChart: (state, action: PayloadAction<number>): void => {
			const index = action.payload;
			state.charts = state.charts.filter((_, i) => i !== index);
			Data.charts = Data.charts.filter((_, i) => i !== index);
		},
		changeChartTicker: (state, action: PayloadAction<{ index: number; ticker: string }>): void => {
			const { ticker, index } = action.payload;
			state.charts[index].ticker = ticker;
			state.charts[index].status = 'idle';
			state.charts[index].timeSpan = DAYS_1M_BACK;
		},
		changeChartDataCategory: (
			state,
			action: PayloadAction<{ index: number; dataCategory: ChartDataCategory }>
		): void => {
			const { index, dataCategory } = action.payload;
			const chart = state.charts[index];
			state.charts[index] = { ...chart, dataCategory: dataCategory, status: 'idle' };
		},
		changeChartTimeSpan: (state, action: PayloadAction<{ index: number; timeSpan: number }>): void => {
			const { index, timeSpan } = action.payload;
			state.charts[index].timeSpan = timeSpan;
		},
		changeDisplayMode: (state, action: PayloadAction<{ index: number; mode: DisplayMode }>): void => {
			const { index, mode } = action.payload;
			state.charts[index].displayMode = mode;
		},
		changeChartResolution: (state, action: PayloadAction<{ index: number; resolution: number }>): void => {
			const { index, resolution } = action.payload;
			state.charts[index].resolution = resolution;
		},
		changeChartScale: (state, action: PayloadAction<{ index: number; scale: string }>): void => {
			const { index, scale } = action.payload;
			state.charts[index].scale = scale;
		},
	},
});

export const {
	addNewInitChart,
	deleteChart,
	changeChartTicker,
	changeChartDataCategory,
	changeChartTimeSpan,
	changeDisplayMode,
	changeChartResolution,
	changeChartScale,
} = chartsSlice.actions;

export const selectCharts = (state: RootState) => state.charts.charts;
export const selectChart = (state: RootState, index: number) => state.charts.charts[index];
export const selectChartStatus = (state: RootState, index: number) => state.charts.charts[index].status;
export const selectChartDataCategory = (state: RootState, index: number) => state.charts.charts[index].dataCategory;
export const selectChartTimeSpan = (state: RootState, index: number) => state.charts.charts[index].timeSpan;
export const selectChartTicker = (state: RootState, index: number) => state.charts.charts[index].ticker;
export const selectChartResolution = (state: RootState, index: number) => state.charts.charts[index].resolution;
export const selectChartScale = (state: RootState, index: number) => state.charts.charts[index].scale;
export const selectChartDisplayMode = (state: RootState, index: number) => state.charts.charts[index].displayMode;
export const selectChartData = (state: RootState, index: number) => {
	const { ticker, dataCategory } = state.charts.charts[index];
	if (ticker === '') return [];
	const marketData = Data.marketData.get(ticker);
	if (!marketData) return [];
	if (dataCategory === 'price') {
		return marketData.priceHistory;
	} else if (dataCategory === 'volume') {
		return marketData.volumeHistory;
	} else if (dataCategory === 'mCap') {
		return marketData.mCapHistory;
	} else {
		return marketData.priceHistory;
	}
};

export default chartsSlice.reducer;
