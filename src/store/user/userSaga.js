import { takeLatest, put, call, all } from 'redux-saga/effects';

import {
	signInSuccess,
	signInFailed,
	signOutSuccess,
	signOutFailed,
	signUpSuccess,
	signUpFailed,
	updateFavChainFailed,
	updateFavChainSuccess,
	updateUsernameSuccess,
	updateUsernameFailed,
	updateEmailFailed,
	updateEmailSuccess,
	confirmPasswordSuccess,
	confirmPasswordFailed,
	updatePasswordSuccess,
	updatePasswordFailed,
	updateAvatarColorSuccess,
	updateAvatarColorFailed,
	checkUserSessionFailed,
} from './userSlice';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signOutUser,
	createAuthUserWithEmailAndPassword,
	signInUser,
	SIGN_IN_METHOD_EMAIL_PASSWORD,
	updateFavChainTicker,
	updateUserFavChain,
	updateUserUsername,
	updateUserEmail,
	confirmUserPassword,
	updateUserPassword,
	updateUserAvatarColor,
} from '../../app/firebase/firebase';
import { delay } from '../marketData/marketDataSaga';
import { DEFAULT_AVATAR_COLOR } from '../../app/utils/consts';

export function* getSnapShotFromUserAuth(userAuth) {
	try {
		const userSnapShot = yield call(createUserDocumentFromAuth, userAuth);
		if (userAuth.uid !== userSnapShot.id) throw new Error('uid does not match document id');
		const data = userSnapShot.data;
		// throw new Error('TEST ERROR');
		yield put(signInSuccess(userSnapShot.data()));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithEmail({ payload }) {
	const { email, password } = payload;
	try {
		yield call(delay, 1000);
		const { user } = yield call(signInUser, SIGN_IN_METHOD_EMAIL_PASSWORD, email, password);
		yield call(getSnapShotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapShotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signUp({ payload }) {
	const { email, password, username, gender, age, occupation } = payload;
	try {
		yield call(delay, 2000);
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
		const signedUpUser = {
			uid: user.uid,
			username: username,
			email: email,
			gender: gender,
			age: age,
			occupation: occupation,
			createdAt: user.reloadUserInfo.createdAt,
			favChain: '',
			avatarColor: DEFAULT_AVATAR_COLOR,
		};
		yield put(signUpSuccess(signedUpUser));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* signInAfterSignUp({ payload }) {
	yield call(getSnapShotFromUserAuth, payload);
}

export function* isUserAuthenticated() {
	try {
		yield call(delay, 1000);
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) throw new Error('No user to authenticate');
		yield call(getSnapShotFromUserAuth, userAuth);
	} catch (error) {
		yield put(checkUserSessionFailed(error.message));
	}
}

export function* signOut() {
	try {
		yield call(delay, 2000);
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

export function* updateFavChain({ payload }) {
	const ticker = payload;
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) throw new Error(`Can't update favChain without userAuth`);
		yield call(delay, 1000);
		const updatedTicker = yield call(updateUserFavChain, userAuth, ticker);
		yield put(updateFavChainSuccess(updatedTicker));
	} catch (error) {
		yield put(updateFavChainFailed(error.message));
	}
}

export function* updateUsername({ payload }) {
	const newUsername = payload;
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) throw new Error(`Can't update username without userAuth`);
		yield call(delay, 1000);
		const updatedUsername = yield call(updateUserUsername, userAuth, newUsername);
		yield put(updateUsernameSuccess(updatedUsername));
	} catch (error) {
		yield put(updateUsernameFailed(error.message));
	}
}

export function* updateEmail({ payload }) {
	const newEmail = payload;
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) throw new Error(`Can't update email without userAuth`);
		yield call(delay, 1000);
		const updatedEmail = yield call(updateUserEmail, userAuth, newEmail);
		yield put(updateEmailSuccess(updatedEmail));
	} catch (error) {
		yield put(updateEmailFailed(error.message));
	}
}

export function* confirmPassword({ payload }) {
	const confirmPassword = payload;
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) throw new Error(`Can't confirm password without userAuth`);
		yield call(delay, 1000);
		yield call(confirmUserPassword, userAuth, confirmPassword);
		yield put(confirmPasswordSuccess());
	} catch (error) {
		yield put(confirmPasswordFailed(error.message));
	}
}

export function* updatePassword({ payload }) {
	const newPassword = payload;
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) throw new Error(`Can't update password without userAuth`);
		yield call(delay, 1000);
		yield call(updateUserPassword, userAuth, newPassword);
		yield put(updatePasswordSuccess());
	} catch (error) {
		yield put(updatePasswordFailed(error.message));
	}
}

export function* updateAvatarColor({ payload }) {
	const color = payload;
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) throw new Error(`Can't update avatar color without userAuth`);
		yield call(delay, 1000);
		const updatedColor = yield call(updateUserAvatarColor, userAuth, color);
		yield put(updateAvatarColorSuccess(updatedColor));
	} catch (error) {
		yield put(updateAvatarColorFailed(error.message));
	}
}

export function* userSagas() {
	yield takeLatest('user/checkUserSessionStart', isUserAuthenticated);
	yield takeLatest('user/signUpStart', signUp);
	yield takeLatest('user/signUpSuccess', signInAfterSignUp);
	yield takeLatest('user/signInEmailStart', signInWithEmail);
	yield takeLatest('user/signInGoogleStart', signInWithGoogle);
	yield takeLatest('user/signOutStart', signOut);
	yield takeLatest('user/updateFavChainStart', updateFavChain);
	yield takeLatest('user/updateUsernameStart', updateUsername);
	yield takeLatest('user/updateEmailStart', updateEmail);
	yield takeLatest('user/confirmPasswordStart', confirmPassword);
	yield takeLatest('user/updatePasswordStart', updatePassword);
	yield takeLatest('user/updateAvatarColorStart', updateAvatarColor);
}
