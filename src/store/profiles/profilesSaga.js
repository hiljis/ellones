import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getProfiles } from '../../app/firebase/firebase';
import { fetchProfilesSuccess, fetchProfilesFailed } from './profilesSlice';

function* fetchProfilesAsync() {
	try {
		const profiles = yield call(getProfiles);
		yield put(fetchProfilesSuccess(profiles));
	} catch (err) {
		yield put(fetchProfilesFailed(err.message));
	}
}

function* profilesSaga() {
	yield takeEvery('profiles/fetchProfiles', fetchProfilesAsync);
}

export default profilesSaga;
