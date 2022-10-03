import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../../app/Data/Data';
import { MarketData, TickerError, TickerStatus } from '../../app/utils/types';
import { RootState } from '../store';

export type ActiveData = 'price' | 'volume' | 'mCap';

export type ChangeData = {
	'24h': number;
	'1w': number;
	'1m': number;
	'3m': number;
	'6m': number;
	'1y': number;
	'3y': number;
	range: number;
};

const initChangeData: ChangeData = {
	'24h': -100,
	'1w': -100,
	'1m': -100,
	'3m': -100,
	'6m': -100,
	'1y': -100,
	'3y': -100,
	range: -100,
};

export interface MarketListRowModel {
	ticker: string;
	currentPrice: number;
	currentMCap: number;
	price: ChangeData;
	volume: ChangeData;
	mCap: ChangeData;
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
export type MarketListStatus = 'idle' | 'calc-failed' | 'calc-complete' | 'calc-incomplete';

export type MarketListState = {
	tickerStatus: { [ticker: string]: TickerStatus };
	size: number;
	activeData: ActiveData;
	sortTarget: SortTarget;
	sortAsc: boolean;
	rangeStart: string | number;
	rangeEnd: string | number;
	errors: TickerError[];
	status: MarketListStatus;
};

const initialState: MarketListState = {
	tickerStatus: {},
	size: 0,
	activeData: 'price',
	sortTarget: 'currentMCap',
	sortAsc: true,
	rangeStart: '',
	rangeEnd: '',
	errors: [],
	status: 'idle',
};

export const marketListSlice = createSlice({
	name: 'marketList',
	initialState,
	reducers: {
		initMarketList: (state, action: PayloadAction<string[]>) => {
			const tickers = action.payload;
			tickers.forEach((ticker) => {
				state.tickerStatus[ticker] = 'idle';
				const initMarketListData = {
					ticker: ticker,
					currentPrice: 0,
					currentMCap: 0,
					price: { ...initChangeData },
					mCap: { ...initChangeData },
					volume: { ...initChangeData },
				};
				Data.marketListData.set(ticker, initMarketListData);
			});
			state.size = tickers.length;
		},
		calculateRowDataStart: (state, action: PayloadAction<MarketData>) => {
			const ticker = action.payload.ticker;
			state.tickerStatus[ticker] = 'calculating';
		},
		calculateRowDataSuccess: (state, action: PayloadAction<string>) => {
			const ticker = action.payload;
			state.tickerStatus[ticker] = 'calc-success';
		},
		calculateRowDataFailed: (state, action: PayloadAction<string>) => {
			const ticker = action.payload;
			state.tickerStatus[ticker] = 'calc-failed';
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
		changeStatus: (state, action: PayloadAction<MarketListStatus>) => {
			state.status = action.payload;
		},
	},
});

export const {
	initMarketList,
	calculateRowDataStart,
	calculateRowDataSuccess,
	calculateRowDataFailed,
	changeActiveData,
	changeSortTarget,
	toggleSortAsc,
	changeRangeStart,
	changeRangeEnd,
	calcRangeChange,
	changeStatus,
} = marketListSlice.actions;

export const selectMarketListStatus = (state: RootState) => state.marketList.status;
export const selectMarketListActiveData = (state: RootState) => state.marketList.activeData;
export const selectMarketListSortTarget = (state: RootState) => state.marketList.sortTarget;
export const selectMarketListSortAsc = (state: RootState) => state.marketList.sortAsc;
export const selectMarketListRangeStart = (state: RootState) => state.marketList.rangeStart;
export const selectMarketListRangeEnd = (state: RootState) => state.marketList.rangeEnd;
export const selectMarketListData = (state: RootState) => {
	return Array.from(Data.marketListData.values());
};
export const selectRowDataByTicker = (state: RootState, ticker: string) => {
	return Data.marketListData.get(ticker);
};
export const selectMarketListDataStatus = (state: RootState) => {
	return state.marketList.status;
};
export const selectRowDataStatusByTicker = (state: RootState, ticker: string) => {
	return state.marketList.tickerStatus[ticker];
};

export default marketListSlice.reducer;
