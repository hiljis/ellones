import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../../app/Data/Data';
import { MarketData, TickerError, TickerStatus } from '../../app/utils/types';
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

export interface HistoryData {
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
}

export interface HistoryMatrixState {
	ticker: string;
	tickers: string[];
	data: HistoryData[];
	tickerStatus: { [ticker: string]: TickerStatus };
	dataTarget: DataTarget;
	algoMonth: CalcAlgo;
	algoYear: CalcAlgo;
	status: 'idle' | 'calculating' | 'calc-complete' | 'calc-incomplete' | 'calc-failed';
	size: number;
	errors: TickerError[];
}

const initialState: HistoryMatrixState = {
	ticker: '---',
	tickers: [],
	data: [],
	tickerStatus: {},
	dataTarget: 'price',
	algoMonth: 'avg',
	algoYear: 'avg',
	status: 'idle',
	size: 0,
	errors: [],
};

export const historyMatrixSlice = createSlice({
	name: 'historyMatrix',
	initialState,
	reducers: {
		initHistoryTickers: (state, action: PayloadAction<string[]>) => {
			const tickers = action.payload;
			tickers.forEach((ticker) => {
				state.tickerStatus[ticker] = 'idle';
			});
			state.size = tickers.length;
		},
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
		calcHistoryDataStart: (state, action: PayloadAction<MarketData>): void => {
			const marketData = action.payload;
			state.tickerStatus[marketData.ticker] = 'calculating';
			state.status = 'calculating';
		},
		calcHistoryDataSuccess: (state, action: PayloadAction<HistoryData>): void => {
			const historyData = action.payload;
			state.tickerStatus[historyData.ticker] = 'calc-success';
			Data.historyData.set(historyData.ticker, historyData);
			// state.data.push(action.payload);

			const values = Object.values(state.tickerStatus);
			state.status =
				values.filter((value) => value !== 'calc-success').length === 0 ? 'calc-complete' : 'calc-incomplete';
		},
		calcHistoryDataFailed: (state, action: PayloadAction<TickerError>): void => {
			const error = action.payload;
			state.status = 'calc-failed';
			state.tickerStatus[error.ticker] = 'calc-failed';
			state.errors.push(action.payload);
		},
	},
});

export const {
	initHistoryTickers,
	changeTicker,
	changeAlgoMonth,
	changeAlgoYear,
	changeDataTarget,
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
	const historyData = Data.historyData.get(activeTicker);
	if (!historyData) return null;

	if (activeDataTarget === 'price') return historyData.price;
	if (activeDataTarget === 'mCap') return historyData.mCap;
	if (activeDataTarget === 'volume') return historyData.volume;
	else return null;
};

export default historyMatrixSlice.reducer;
