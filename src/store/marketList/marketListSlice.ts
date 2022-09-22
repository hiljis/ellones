import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangeData, TickerError } from '../../app/utils/types';
import { RootState } from '../store';

export type ActiveData = 'price' | 'volume' | 'mCap';

export interface MarketListRowModel {
	ticker: string;
	currentPrice: number;
	currentMCap: number;
	price: ChangeData;
	volume: ChangeData;
	mCap: ChangeData;
	status: 'complete' | 'idle';
}

export type SortTarget =
	| 'ticker'
	| 'currentPrice'
	| '24h'
	| '1w'
	| '1m'
	| '3m'
	| '6m'
	| '1y'
	| '3y'
	| 'range'
	| 'currentMCap';
export type MarketListStatus = 'idle' | 'loading-profiles' | 'loading-marketData' | 'failed' | 'success';

export type MarketListState = {
	activeData: ActiveData;
	sortTarget: SortTarget;
	sortAsc: boolean;
	rangeStart: string | number;
	rangeEnd: string | number;
	error: TickerError[];
	status: MarketListStatus;
};

const initialState: MarketListState = {
	activeData: 'price',
	sortTarget: 'currentMCap',
	sortAsc: true,
	rangeStart: '',
	rangeEnd: '',
	error: [],
	status: 'idle',
};

export const marketListSlice = createSlice({
	name: 'marketList',
	initialState,
	reducers: {
		fetchMarketDataFor: (state, action: PayloadAction<{ tickers: string[] }>) => {
			state.status = 'loading-marketData';
		},
		fetchMarketDataForSuccess: (state) => {
			state.status = 'success';
		},
		fetchMarketDataForFailed: (state, action: PayloadAction<string>) => {
			state.error.push({ ticker: '', error: action.payload });
			state.status = 'failed';
		},
		changeActiveData: (state, action: PayloadAction<ActiveData>) => {
			state.activeData = action.payload;
		},
		changeSortTarget: (state, action: PayloadAction<SortTarget>) => {
			state.sortTarget = action.payload;
		},
		toggleSortAsc: (state) => {
			state.sortAsc = !state.sortAsc;
		},
		changeRangeStart: (state, action: PayloadAction<string | number>) => {
			state.rangeStart = action.payload;
		},
		changeRangeEnd: (state, action: PayloadAction<string | number>) => {
			state.rangeEnd = action.payload;
		},
		calcRangeChange: (state) => {
			console.log('Calculate range change and update market list');
		},
		addData: (state) => {
			// state.status = 'loading';
		},
		changeStatus: (state, action: PayloadAction<MarketListStatus>) => {
			state.status = action.payload;
		},
		addError: (state, action: PayloadAction<TickerError>) => {
			state.error.push(action.payload);
			state.status = 'failed';
		},
	},
});

export const {
	fetchMarketDataFor,
	fetchMarketDataForSuccess,
	fetchMarketDataForFailed,
	changeActiveData,
	changeSortTarget,
	toggleSortAsc,
	changeRangeStart,
	changeRangeEnd,
	calcRangeChange,
	addData,
	changeStatus,
	addError,
} = marketListSlice.actions;

export const selectMarketListStatus = (state: RootState) => state.marketList.status;
export const selectMarketListActiveData = (state: RootState) => state.marketList.activeData;
export const selectMarketListSortTarget = (state: RootState) => state.marketList.sortTarget;
export const selectMarketListSortAsc = (state: RootState) => state.marketList.sortAsc;
export const selectMarketListRangeStart = (state: RootState) => state.marketList.rangeStart;
export const selectMarketListRangeEnd = (state: RootState) => state.marketList.rangeEnd;

export default marketListSlice.reducer;
