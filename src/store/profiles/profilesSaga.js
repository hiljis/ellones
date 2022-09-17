import { call, put, takeEvery } from 'redux-saga/effects';
import { getProfiles } from '../../app/firebase/firebase';
import { fetchProfilesSuccess, fetchProfilesFailed } from './profilesSlice';

function getLocalProfiles() {
	const tsNow = Date.now();
	const monthInMillis = 1000 * 60 * 60 * 24 * 30;
	const profilesObject = JSON.parse(localStorage.getItem('ellones_profiles'));

	if (!profilesObject) return null;

	const tsProfilesLastSet = profilesObject.date;
	if (tsNow - tsProfilesLastSet > monthInMillis) return null;

	return profilesObject.profiles;
}

function setLocalProfiles(profiles) {
	localStorage.setItem('ellones_profiles', JSON.stringify({ date: Date.now(), profiles: profiles }));
}

function* fetchProfilesAsync() {
	try {
		const localProfiles = getLocalProfiles();
		// const localProfiles = null;
		if (!localProfiles) {
			const profiles = yield call(getProfiles);
			yield put(fetchProfilesSuccess(profiles));
			setLocalProfiles(profiles);
		} else {
			yield put(fetchProfilesSuccess(localProfiles));
		}
	} catch (err) {
		yield put(fetchProfilesFailed(err.message));
	}
}

export function* profilesSaga() {
	yield takeEvery('profiles/fetchProfiles', fetchProfilesAsync);
}

export default profilesSaga;
