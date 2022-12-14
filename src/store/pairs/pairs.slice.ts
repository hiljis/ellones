import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../../app/Data/Data';
import { DAYS_1M_BACK } from '../../app/utils/consts';
import { IndexError, MarketDataPoint } from '../../app/utils/types';
import { RootState } from '../store';

export type PairDataCategory = 'price' | 'mCap' | 'volume' | 'tvl';

export interface Pair {
	dataCategory: PairDataCategory;
	timeSpan: number;
	numerator: string;
	denominator: string;
	status: 'idle' | 'loading' | 'load-complete' | 'load-failed' | 'calculating' | 'calc-complete' | 'calc-failed';
}

export type PairsState = {
	pairs: Pair[];
	status: 'idle' | 'loading' | 'failed' | 'success';
	error: IndexError[];
};

const initialState: PairsState = {
	pairs: [
		{
			dataCategory: 'mCap',
			numerator: '',
			denominator: '',
			status: 'idle',
			timeSpan: DAYS_1M_BACK,
		},
	],
	status: 'idle',
	error: [],
};

export const pairsSlice = createSlice({
	name: 'pairs',
	initialState,
	reducers: {
		calcPairDataStart: (
			state,
			action: PayloadAction<{
				index: number;
				numeratorData: MarketDataPoint[];
				denominatorData: MarketDataPoint[];
			}>
		): void => {
			const { index } = action.payload;
			state.pairs[index].status = 'calculating';
		},
		calcPairDataSuccess: (state, action: PayloadAction<{ index: number; data: MarketDataPoint[] }>): void => {
			const { index, data } = action.payload;
			Data.pairs[index] = data;
			state.pairs[index].status = 'calc-complete';
			state.pairs[index].timeSpan = DAYS_1M_BACK;
		},
		calcPairDataFailed: (state, action: PayloadAction<{ index: number; error: IndexError }>): void => {
			const { index, error } = action.payload;
			state.pairs[index].status = 'calc-failed';
			state.error.push(error);
		},
		addNewInitPair: (state): void => {
			const pair: Pair = {
				numerator: '',
				denominator: '',
				status: 'idle',
				dataCategory: 'mCap',
				timeSpan: DAYS_1M_BACK,
			};
			state.pairs.push(pair);
			Data.pairs.push([]);
		},
		deletePair: (state, action: PayloadAction<number>): void => {
			const index = action.payload;
			state.pairs = state.pairs.filter((_, i) => i !== index);
			Data.pairs = Data.pairs.filter((_, i) => i !== index);
		},
		changeNumerator: (state, action: PayloadAction<{ index: number; ticker: string }>): void => {
			const { ticker, index } = action.payload;
			state.pairs[index].numerator = ticker;
			state.pairs[index].status = 'idle';
		},
		changeDenominator: (state, action: PayloadAction<{ index: number; ticker: string }>): void => {
			const { ticker, index } = action.payload;
			state.pairs[index].denominator = ticker;
			state.pairs[index].status = 'idle';
		},
		changeDataCategory: (state, action: PayloadAction<{ index: number; dataCategory: PairDataCategory }>): void => {
			const { index, dataCategory } = action.payload;
			const pair = state.pairs[index];
			state.pairs[index] = { ...pair, dataCategory: dataCategory, status: 'idle' };
		},
		changeTimeSpan: (state, action: PayloadAction<{ index: number; timeSpan: number }>): void => {
			const { index, timeSpan } = action.payload;
			state.pairs[index].timeSpan = timeSpan;
		},
	},
});

export const {
	addNewInitPair,
	deletePair,
	changeNumerator,
	changeDenominator,
	changeDataCategory,
	changeTimeSpan,
	calcPairDataStart,
	calcPairDataSuccess,
	calcPairDataFailed,
} = pairsSlice.actions;

export const selectPairs = (state: RootState) => state.pairs.pairs;
export const selectPair = (state: RootState, index: number) => state.pairs.pairs[index];
export const selectPairData = (state: RootState, index: number) => {
	if (Data.pairs.length === 0) return [];
	if (!Data.pairs[index]) return [];
	return Data.pairs[index];
};
export const selectPairStatus = (state: RootState, index: number) => state.pairs.pairs[index].status;
export const selectPairDataCategory = (state: RootState, index: number) => state.pairs.pairs[index].dataCategory;
export const selectPairTimeSpan = (state: RootState, index: number) => state.pairs.pairs[index].timeSpan;

export default pairsSlice.reducer;
