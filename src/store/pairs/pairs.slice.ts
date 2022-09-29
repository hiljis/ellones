import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IndexError, MarketDataPoint } from '../../app/utils/types';
import { RootState } from '../store';

export interface Pair {
	dataCategory: 'price' | 'mMap' | 'volume' | 'tvl';
	numerator: string;
	denominator: string;
	data: MarketDataPoint[];
	status: 'idle' | 'loading' | 'load-complete' | 'load-failed' | 'calculating' | 'calc-complete' | 'calc-failed';
}

export type PairsState = {
	pairs: Pair[];
	status: 'idle' | 'loading' | 'failed' | 'success';
	error: IndexError[];
};

const initialState: PairsState = {
	pairs: [{ dataCategory: 'mMap', numerator: '', denominator: '', data: [], status: 'idle' }],
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
			state.pairs[index] = { ...state.pairs[index], status: 'calculating' };
		},
		calcPairDataSuccess: (state, action: PayloadAction<{ index: number; data: MarketDataPoint[] }>): void => {
			const { index, data } = action.payload;
			state.pairs[index] = { ...state.pairs[index], data: data, status: 'calc-complete' };
		},
		calcPairDataFailed: (state, action: PayloadAction<{ index: number; error: IndexError }>): void => {
			const { index, error } = action.payload;
			state.pairs[index] = { ...state.pairs[index], status: 'calc-failed' };
			state.error.push(error);
		},
		addNewInitPair: (state): void => {
			const pair: Pair = { numerator: '', denominator: '', status: 'idle', dataCategory: 'mMap', data: [] };
			state.pairs.push(pair);
		},
		deletePair: (state, action: PayloadAction<number>): void => {
			const index = action.payload;
			state.pairs = state.pairs.filter((_, i) => i !== index);
		},
		changeNumerator: (state, action: PayloadAction<{ index: number; ticker: string }>): void => {
			const { ticker, index } = action.payload;
			const pair = state.pairs[index];
			state.pairs[index] = { ...pair, numerator: ticker, status: 'idle' };
		},
		changeDenominator: (state, action: PayloadAction<{ index: number; ticker: string }>): void => {
			const { ticker, index } = action.payload;
			const pair = state.pairs[index];
			state.pairs[index] = { ...pair, denominator: ticker, status: 'idle' };
		},
		changeDataCategory: (
			state,
			action: PayloadAction<{ index: number; dataCategory: 'price' | 'mMap' | 'volume' | 'tvl' }>
		): void => {
			const { index, dataCategory } = action.payload;
			const pair = state.pairs[index];
			state.pairs[index] = { ...pair, dataCategory: dataCategory };
		},
	},
});

export const {
	addNewInitPair,
	deletePair,
	changeNumerator,
	changeDenominator,
	calcPairDataStart,
	calcPairDataSuccess,
	calcPairDataFailed,
} = pairsSlice.actions;

export const selectPairs = (state: RootState) => state.pairs.pairs;
export const selectPair = (state: RootState, index: number) => state.pairs.pairs[index];
export const selectPairData = (state: RootState, index: number) => state.pairs.pairs[index].data;
export const selectPairStatus = (state: RootState, index: number) => state.pairs.pairs[index].status;

export default pairsSlice.reducer;
