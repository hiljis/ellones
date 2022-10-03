import { put, takeEvery } from 'redux-saga/effects';
import { Data } from '../../app/Data/Data';
import {
	DAYS_1M_BACK,
	DAYS_1W_BACK,
	DAYS_1Y_BACK,
	DAYS_24H_BACK,
	DAYS_3M_BACK,
	DAYS_3Y_BACK,
	DAYS_6M_BACK,
} from '../../app/utils/consts';
import { calculateRowDataFailed, calculateRowDataSuccess } from './marketListSlice';

export function calcRowData(history) {
	const indexes = [
		history.length - (DAYS_24H_BACK + 1),
		history.length - (DAYS_1W_BACK + 1),
		history.length - (DAYS_1M_BACK + 1),
		history.length - (DAYS_3M_BACK + 1),
		history.length - (DAYS_6M_BACK + 1),
		history.length - (DAYS_1Y_BACK + 1),
		history.length - (DAYS_3Y_BACK + 1),
	];

	const dpToday = history[history.length - 1].y;
	const changeData = indexes.map((index) => {
		if (index < 0) return -100;
		const percentChange = (dpToday / history[index].y - 1) * 100;
		return parseFloat(percentChange.toFixed(1));
	});
	return {
		'24h': changeData[0],
		'1w': changeData[1],
		'1m': changeData[2],
		'3m': changeData[3],
		'6m': changeData[4],
		'1y': changeData[5],
		'3y': changeData[6],
		range: -100,
	};
}

export function* calculateRowData({ payload }) {
	const { ticker, priceHistory, mCapHistory, volumeHistory } = payload;
	try {
		const currentPrice = priceHistory[priceHistory.length - 1].y;
		const currentMCap = mCapHistory[mCapHistory.length - 1].y;
		const changeDataPrice = calcRowData(priceHistory);
		const changeDataMCap = calcRowData(mCapHistory);
		const changeDataVolume = calcRowData(volumeHistory);
		Data.marketListData.set(ticker, {
			ticker: ticker,
			currentPrice: currentPrice,
			currentMCap: currentMCap,
			price: changeDataPrice,
			mCap: changeDataMCap,
			volume: changeDataVolume,
			status: 'complete',
		});
		yield put(calculateRowDataSuccess(ticker));
	} catch (err) {
		yield put(calculateRowDataFailed({ ticker: ticker, error: err.message }));
	}
}

export function* marketListSaga() {
	yield takeEvery('marketList/calculateRowDataStart', calculateRowData);
}

export default marketListSaga;
