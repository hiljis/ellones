import { put, takeEvery } from 'redux-saga/effects';

import { calcPairDataFailed, calcPairDataSuccess } from './pairs.slice';

export function* calcPairData({ payload }) {
	const { index, numeratorData, denominatorData } = payload;
	try {
		// Shortest history decide length of the pair data
		const numeratorDataLength = numeratorData.length;
		const denominatorDataLength = denominatorData.length;

		let pairData;
		if (numeratorDataLength >= denominatorDataLength) {
			pairData = denominatorData.map((dData, i) => {
				if (dData.y === 0) return { x: dData.x, y: -1 };
				return { x: dData.x, y: numeratorData[i].y / dData.y };
			});
		} else if (numeratorDataLength <= denominatorDataLength) {
			pairData = numeratorData.map((nData, i) => {
				return { x: nData.x, y: nData.y / denominatorData[i].y };
			});
		}
		yield put(calcPairDataSuccess({ index: index, data: pairData }));
	} catch (err) {
		yield put(calcPairDataFailed({ index: index, error: { index: index, error: err.message } }));
	}
}

export function* pairsSaga() {
	yield takeEvery('pairs/calcPairDataStart', calcPairData);
}

export default pairsSaga;
