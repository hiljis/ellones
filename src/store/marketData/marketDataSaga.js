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
import { calcHistoryDataStart } from '../historyMatrix/historyMatrix.slice';
import { calculateRowDataStart } from '../marketList/marketListSlice';
import {
	fetchMarketData,
	fetchMarketDataFailed,
	fetchMarketDataForProfilesFailed,
	fetchMarketDataSuccess,
	setStatusToIncomplete,
} from './marketDataSlice';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function* wait60sec() {
	yield call(delay, 10000);
	yield put(setStatusToIncomplete());
}

export function* fetchMarketDataAsync({ payload }) {
	const { ticker } = payload;
	try {
		const data = yield call(getCoinGeckoMarketDataHistory, ticker);
		yield put(fetchMarketDataSuccess(data));
		yield put(calculateRowDataStart(data));
		yield put(calcHistoryDataStart(data));
	} catch (err) {
		yield put(fetchMarketDataFailed({ ticker: ticker, error: err.message }));
		yield call(wait60sec);
	}
}

export function* fetchMarketDataForProfilesAsync({ payload }) {
	const { tickers } = payload;
	for (let i = 0; i < tickers.length; i++) {
		yield call(delay, 3000);
		try {
			yield put(fetchMarketData({ ticker: tickers[i] }));
		} catch (err) {
			const tickerError = { ticker: tickers[i], error: err.message };
			const failedTickers = [];
			while (i < tickers.length) {
				failedTickers.push(tickers[i]);
				i++;
			}
			console.log('IN SAGA FAILED TICKERS: ', failedTickers);
			yield put(fetchMarketDataForProfilesFailed({ failedTickers: failedTickers, error: tickerError }));
			break;
		}
	}
}

export function* marketDataSaga() {
	yield takeEvery('marketData/fetchMarketData', fetchMarketDataAsync);
	yield takeLatest('marketData/fetchMarketDataForProfiles', fetchMarketDataForProfilesAsync);
}

export default marketDataSaga;
