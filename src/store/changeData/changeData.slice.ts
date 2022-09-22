import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { number } from 'yup';
import { tickers } from '../../app/utils/tickers';
import { ChangeData, TickerError } from '../../app/utils/types';
import { MarketListRowModel } from '../marketList/marketListSlice';
import { RootState } from '../store';

interface ChangeDataState {
	data: MarketListRowModel[];
	size: number;
	status: 'idle' | 'error' | 'complete';
	errors: TickerError[];
}

const initialState: ChangeDataState = {
	data: [],
	size: 0,
	status: 'idle',
	errors: [],
};

export const changeDataSlice = createSlice({
	name: 'changeData',
	initialState,
	reducers: {
		addTickersToChangeData: (state, action: PayloadAction<string[]>) => {
			const tickers = action.payload;
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
			state.data = tickers.map((ticker) => {
				return {
					ticker: ticker,
					currentPrice: 0,
					currentMCap: 0,
					price: { ...initChangeData },
					mCap: { ...initChangeData },
					volume: { ...initChangeData },
					status: 'idle',
				};
			});
		},
		addChangeData: (state, action: PayloadAction<MarketListRowModel>) => {
			const { ticker } = action.payload;
			state.data = state.data.map((dataItem) => {
				if (dataItem.ticker === ticker) return action.payload;
				return dataItem;
			});
			state.size = state.size + 1;
			if (state.size === state.data.length) state.status = 'complete';
		},
	},
});

export const { addTickersToChangeData, addChangeData } = changeDataSlice.actions;

export const selectChangeData = (state: RootState) => {
	return state.changeData.data;
};

export default changeDataSlice.reducer;
