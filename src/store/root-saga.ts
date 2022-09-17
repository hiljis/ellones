import { all, call } from 'redux-saga/effects';

import { marketDataSaga } from './marketData/marketDataSaga';
import { profilesSaga } from './profiles/profilesSaga';
import { userSagas } from './user/userSaga';

export function* rootSaga() {
	yield all([call(marketDataSaga), call(profilesSaga), call(userSagas)]);
}
