import { all, call } from 'redux-saga/effects';

import { marketDataSaga } from './marketData/marketDataSaga';
import { profilesSaga } from './profiles/profilesSaga';
import { userSagas } from './user/userSaga';
import { marketListSaga } from './marketList/marketListSaga';
import { historyMatrixSaga } from './historyMatrix/historyMatrix.saga';

export function* rootSaga() {
	yield all([
		call(marketDataSaga),
		call(profilesSaga),
		call(userSagas),
		call(marketListSaga),
		call(historyMatrixSaga),
	]);
}
