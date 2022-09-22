import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getCoinGeckoMarketDataHistory } from '../../app/coingecko/coingecko';
import {
	DAYS_1M_BACK,
	DAYS_1W_BACK,
	DAYS_1Y_BACK,
	DAYS_24H_BACK,
	DAYS_3M_BACK,
	DAYS_3Y_BACK,
	DAYS_6M_BACK,
} from '../../app/utils/consts';
import { addChangeData } from '../changeData/changeData.slice';
import {
	calcChangeDataAfterFetchSuccess,
	calcChangeDataFailed,
	calcChangeDataSuccess,
	fetchMarketDataFailed,
	fetchMarketDataSuccess,
} from './marketDataSlice';

export function calcChangeData(history) {
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

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

export function* calculateChangeData({ payload }) {
	const {
		ticker,
		data: { priceHistory, marketCapHistory, volumeHistory },
	} = payload;
	try {
		const currentPrice = priceHistory[priceHistory.length - 1].y;
		const currentMCap = marketCapHistory[marketCapHistory.length - 1].y;
		const changeDataPrice = calcChangeData(priceHistory);
		const changeDataMCap = calcChangeData(marketCapHistory);
		const changeDataVolume = calcChangeData(volumeHistory);
		yield put(
			calcChangeDataSuccess({
				ticker: ticker,
				currentPrice: currentPrice,
				currentMCap: currentMCap,
				price: changeDataPrice,
				mCap: changeDataMCap,
				volume: changeDataVolume,
				status: 'complete',
			})
		);
		yield put(
			addChangeData({
				ticker: ticker,
				currentPrice: currentPrice,
				currentMCap: currentMCap,
				price: changeDataPrice,
				mCap: changeDataMCap,
				volume: changeDataVolume,
				status: 'complete',
			})
		);
	} catch (err) {
		yield put(calcChangeDataFailed({ ticker: ticker, error: err.message }));
	}
}

export function* fetchMarketDataAsync({ payload }) {
	const { ticker } = payload;
	try {
		const marketData = yield call(getCoinGeckoMarketDataHistory, ticker);
		yield put(fetchMarketDataSuccess({ ticker: ticker, data: marketData }));
		yield put(calcChangeDataAfterFetchSuccess({ ticker: ticker, data: marketData }));
	} catch (err) {
		yield put(fetchMarketDataFailed({ ticker: ticker, error: err.message }));
	}
}

export function* fetchMarketDataForProfilesAsync({ payload }) {
	const { tickers } = payload;
	let marketData = [];
	let errors = [];
	for (let i = 0; i < tickers.length; i++) {
		try {
			const data = yield call(getCoinGeckoMarketDataHistory, tickers[i]);
			marketData.push({ ticker: tickers[i], data: data });
			yield put(fetchMarketDataSuccess({ ticker: tickers[i], data: data }));
			yield put(calcChangeDataAfterFetchSuccess({ ticker: tickers[i], data: data }));
			yield call(delay, 3000);
		} catch (err) {
			const error = { ticker: tickers[i], error: err.message };
			errors.push(error);
			yield put(fetchMarketDataFailed({ ticker: tickers[i], error: err.message }));
			yield call(delay, 5000);
		}
	}
	// if (errors.length) {
	// 	yield put(fetchMarketDataForProfilesFailed(errors));
	// } else {
	// 	yield put(fetchMarketDataForProfilesSuccess(marketData));
	// }
}

export function* marketDataSaga() {
	yield takeEvery('marketData/fetchMarketData', fetchMarketDataAsync);
	yield takeEvery('marketData/calcChangeDataAfterFetchSuccess', calculateChangeData);
	yield takeLatest('marketData/fetchMarketDataForProfiles', fetchMarketDataForProfilesAsync);
}

export default marketDataSaga;
