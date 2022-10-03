import { call, put, takeEvery } from 'redux-saga/effects';
import { getProfiles } from '../../app/firebase/firebase';
import { initDominance } from '../dominance/dominance.slice';
import { initHistoryTickers } from '../historyMatrix/historyMatrix.slice';
import { initMarketDataTickers } from '../marketData/marketDataSlice';
import { initMarketList } from '../marketList/marketListSlice';
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
		yield put(initMarketDataTickers(tickers));
		yield put(initMarketList(tickers));
		yield put(initHistoryTickers(tickers));
		yield put(initDominance(tickers));
	} catch (err) {
		yield put(fetchProfilesFailed(err.message));
	}
}

export function* profilesSaga() {
	yield takeEvery('profiles/fetchProfiles', fetchProfilesAsync);
}

export default profilesSaga;
