import { takeLatest } from 'redux-saga/effects';

function* fetchMarketDataForAsync({ payload }) {
	// const { tickers } = payload;
	// try {
	// 	yield tickers.map((ticker) => put(fetchMarketData(ticker)));
	// 	yield put(fetchMarketDataForSuccess());
	// } catch (err) {
	// 	console.log(err.message);
	// 	yield put(fetchMarketDataForFailed(err.message));
	// }
}

export function* marketListSaga() {
	yield takeLatest('marketList/fetchMarketDataFor', fetchMarketDataForAsync);
}

export default marketListSaga;
