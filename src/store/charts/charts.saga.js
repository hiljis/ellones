import { put, select, takeEvery } from 'redux-saga/effects';
import { Data } from '../../app/Data/Data';
import { selectMarketData } from '../marketData/marketDataSlice';

export function* setChartData({ payload }) {
	// const { index, ticker, dataCategory } = payload;
	// const marketData = Data.marketData.get(ticker);
	// console.log(marketData[0]);
	// try {
	// 	// Shortest history decide length of the pair data
	// 	const numeratorDataLength = numeratorData.length;
	// 	const denominatorDataLength = denominatorData.length;
	// 	let pairData;
	// 	if (numeratorDataLength >= denominatorDataLength) {
	// 		pairData = denominatorData.map((dData, i) => {
	// 			if (dData.y === 0) return { x: dData.x, y: -1 };
	// 			return { x: dData.x, y: numeratorData[i].y / dData.y };
	// 		});
	// 	} else if (numeratorDataLength <= denominatorDataLength) {
	// 		pairData = numeratorData.map((nData, i) => {
	// 			return { x: nData.x, y: nData.y / denominatorData[i].y };
	// 		});
	// 	}
	// 	yield put(calcPairDataSuccess({ index: index, data: pairData }));
	// } catch (err) {
	// 	yield put(calcPairDataFailed({ index: index, error: { index: index, error: err.message } }));
	// }
}

export function* chartsSaga() {
	yield takeEvery('charts/setChartDataStart', setChartData);
}

export default chartsSaga;
