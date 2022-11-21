import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fetchMarketDataHistory } from '../../app/coingecko/coingecko';
import { getTestData } from '../../app/Data/TestData';
import { CG_ERROR_STATUS_OVERLOAD, CG_ERROR_STATUS_UNAVAILABLE, ERROR_CODE_TIME_LIMIT } from '../../app/utils/consts';
import { calcHistoryDataStart } from '../historyMatrix/historyMatrix.slice';
import { calculateRowDataStart } from '../marketList/marketListSlice';
import {
	fetchAllFailed,
	fetchAllSuccess,
	fetchTickerFailed,
	fetchTickerSuccess,
	selectFetchQueue,
} from './marketDataSlice';

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function* wait60sec() {
	yield call(delay, 60000);
}

export function* fetchFromQueueAsync() {
	let queueIsEmpty = false;
	while (!queueIsEmpty) {
		const fetchQueue = [...(yield select(selectFetchQueue))];
		const ticker = fetchQueue.pop();
		if (!ticker) break;
		try {
			yield call(delay, 3000);
			const data = yield call(fetchMarketDataHistory, ticker);
			yield put(fetchTickerSuccess(data));
			yield put(calculateRowDataStart(data));
			yield put(calcHistoryDataStart(data));
			if (fetchQueue.length === 0) yield put(fetchAllSuccess());
		} catch (err) {
			yield put(fetchTickerFailed({ ticker: ticker, error: err }));
			if (fetchQueue.length === 0) yield put(fetchAllFailed({ ticker: ticker, error: err }));
			else if (err === CG_ERROR_STATUS_OVERLOAD) {
				yield put(fetchAllFailed({ ticker: ticker, error: err }));
				queueIsEmpty = true;
			} else if (err === CG_ERROR_STATUS_UNAVAILABLE) {
				yield put(fetchAllFailed({ ticker: ticker, error: err }));
				queueIsEmpty = true;
			} else if (err === ERROR_CODE_TIME_LIMIT) {
				yield put(fetchTickerFailed({ ticker: ticker, error: err }));
			}
		}
		if (fetchQueue.length === 0) queueIsEmpty = true;
	}
}

export function* marketDataSaga() {
	yield takeLatest('marketData/fetchTickerStart', fetchFromQueueAsync);
	yield takeLatest('marketData/fetchAllStart', fetchFromQueueAsync);
}

export default marketDataSaga;
