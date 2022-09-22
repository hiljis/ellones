import { call, put, takeEvery } from 'redux-saga/effects';
import { getProfiles } from '../../app/firebase/firebase';
import { addTickersToChangeData } from '../changeData/changeData.slice';
import { fetchProfilesSuccess, fetchProfilesFailed } from './profilesSlice';

function getLocalProfiles() {
	const monthInMillis = 1000 * 60 * 60 * 24 * 30;
	const profilesObject = JSON.parse(localStorage.getItem('ellones_profiles'));

	if (!profilesObject) return null;

	const tsNow = Date.now();
	const tsProfilesLastSet = profilesObject.date;
	if (tsNow - tsProfilesLastSet > monthInMillis) return null;

	return profilesObject.profiles;
}

function setLocalProfiles(profiles) {
	localStorage.setItem('ellones_profiles', JSON.stringify({ date: Date.now(), profiles: profiles }));
}

function* fetchProfilesAsync() {
	try {
		let profiles = getLocalProfiles();
		// const profiles = null;
		if (!profiles) {
			profiles = yield call(getProfiles);
			setLocalProfiles(profiles);
		}
		yield put(fetchProfilesSuccess(profiles));
		const tickers = profiles.map((profile) => profile.ticker);
		yield put(addTickersToChangeData(tickers));
	} catch (err) {
		yield put(fetchProfilesFailed(err.message));
	}
}

export function* profilesSaga() {
	yield takeEvery('profiles/fetchProfiles', fetchProfilesAsync);
}

export default profilesSaga;
