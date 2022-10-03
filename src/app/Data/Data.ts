import { MarketData, MarketDataPoint } from '../utils/types';
import { HistoryData } from '../../store/historyMatrix/historyMatrix.slice';
import { MarketListRowModel } from '../../store/marketList/marketListSlice';

interface DataModel {
	marketData: Map<string, MarketData>;
	marketListData: Map<string, MarketListRowModel>;
	historyData: Map<string, HistoryData>;
	pairs: Array<MarketDataPoint[]>;
}

export const Data: DataModel = {
	marketData: new Map<string, MarketData>(),
	marketListData: new Map<string, MarketListRowModel>(),
	historyData: new Map<string, HistoryData>(),
	pairs: new Array<MarketDataPoint[]>(),
};
