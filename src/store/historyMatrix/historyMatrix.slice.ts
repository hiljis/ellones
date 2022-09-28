import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketData, TickerError } from '../../app/utils/types';
import { RootState } from '../store';

export type CalcAlgo = 'avg' | 'median' | 'max' | 'min';
export type DataTarget = 'price' | 'mCap' | 'volume' | 'tvl';

export interface HistoryMonthData {
	month: number;
	complete: boolean;
	open: number;
	close: number;
	change: number;
}

export type HistoryData = {
	ticker: string;
	price: {
		year: string;
		complete: boolean;
		months: HistoryMonthData[];
	}[];
	mCap: {
		year: string;
		complete: boolean;
		months: HistoryMonthData[];
	}[];
	volume: {
		year: string;
		complete: boolean;
		months: HistoryMonthData[];
	}[];
};

export interface HistoryMatrixState {
	ticker: string;
	tickers: string[];
	data: HistoryData[];
	dataTarget: DataTarget;
	algoMonth: CalcAlgo;
	algoYear: CalcAlgo;
	status: 'idle' | 'loading' | 'failed' | 'data-complete' | 'data-incomplete';
	errors: TickerError[];
}

const initialState: HistoryMatrixState = {
	ticker: 'btc',
	tickers: [],
	data: [],
	dataTarget: 'price',
	algoMonth: 'avg',
	algoYear: 'avg',
	status: 'idle',
	errors: [],
};

export const historyMatrixSlice = createSlice({
	name: 'historyMatrix',
	initialState,
	reducers: {
		changeTicker: (state, action: PayloadAction<string>): void => {
			state.ticker = action.payload;
		},
		changeAlgoMonth: (state, action: PayloadAction<CalcAlgo>): void => {
			state.algoMonth = action.payload;
		},
		changeAlgoYear: (state, action: PayloadAction<CalcAlgo>): void => {
			state.algoYear = action.payload;
		},
		changeDataTarget: (state, action: PayloadAction<'price' | 'mCap' | 'volume' | 'tvl'>): void => {
			state.dataTarget = action.payload;
		},
		addTickers: (state, action: PayloadAction<string[]>): void => {
			state.tickers = action.payload;
		},
		calcHistoryDataStart: (state, action: PayloadAction<MarketData>): void => {
			state.status = 'loading';
		},
		calcHistoryDataSuccess: (state, action: PayloadAction<HistoryData>): void => {
			state.data.push(action.payload);
			if (state.data.length === state.ticker.length) state.status = 'data-complete';
			else state.status = 'data-incomplete';
		},
		calcHistoryDataFailed: (state, action: PayloadAction<TickerError>): void => {
			state.status = 'failed';
			state.errors.push(action.payload);
		},
	},
});

export const {
	changeTicker,
	changeAlgoMonth,
	changeAlgoYear,
	changeDataTarget,
	addTickers,
	calcHistoryDataStart,
	calcHistoryDataSuccess,
	calcHistoryDataFailed,
} = historyMatrixSlice.actions;

export const selectTicker = (state: RootState) => state.historyMatrix.ticker;
export const selectAlgo = (state: RootState, target: string): CalcAlgo => {
	if (target === 'algoYear') return state.historyMatrix.algoYear;
	return state.historyMatrix.algoMonth;
};
export const selectAlgoMonth = (state: RootState) => state.historyMatrix.algoMonth;
export const selectAlgoYear = (state: RootState) => state.historyMatrix.algoYear;
export const selectDataTarget = (state: RootState) => state.historyMatrix.dataTarget;
export const selectHistoryData = (state: RootState) => {
	const activeTicker = state.historyMatrix.ticker;
	const activeDataTarget = state.historyMatrix.dataTarget;
	const historyData = state.historyMatrix.data.filter((d) => d.ticker === activeTicker)[0];
	if (!historyData) return null;

	if (activeDataTarget === 'price') return historyData.price;
	if (activeDataTarget === 'mCap') return historyData.mCap;
	if (activeDataTarget === 'volume') return historyData.volume;
	else return null;
};

export default historyMatrixSlice.reducer;
