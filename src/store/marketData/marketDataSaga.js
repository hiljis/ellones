import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getCoinGeckoMarketDataHistory } from '../../app/coingecko/coingecko';
import { fetchMarketDataFailed, fetchMarketDataSuccess } from './marketDataSlice';

function* fetchMarketDataAsync({ payload }) {
	const { ticker } = payload;
	try {
		const marketData = yield call(getCoinGeckoMarketDataHistory, ticker);
		yield put(fetchMarketDataSuccess({ ticker: ticker, data: marketData }));
	} catch (err) {
		yield put(fetchMarketDataFailed(err.message));
	}
}

export function* marketDataSaga() {
	yield takeEvery('marketData/fetchMarketData', fetchMarketDataAsync);
}

export default marketDataSaga;
