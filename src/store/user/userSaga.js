import { takeLatest, put, call, all } from 'redux-saga/effects';

import { signInSuccess, signInFailed, signOutSuccess, signOutFailed, signUpSuccess, signUpFailed } from './userSlice';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signOutUser,
	createAuthUserWithEmailAndPassword,
	signInUser,
	SIGN_IN_METHOD_EMAIL_PASSWORD,
} from '../../app/firebase/firebase';

export function* getSnapShotFromUserAuth(userAuth) {
	try {
		const userSnapShot = yield call(createUserDocumentFromAuth, userAuth);
		yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* signInWithEmail({ payload }) {
	const { email, password } = payload;
	try {
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
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
		const signedUpUser = {
			uid: user.uid,
			username: username,
			email: email,
			gender: gender,
			age: age,
			occupation: occupation,
			createdAt: user.reloadUserInfo.createdAt,
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
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapShotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error.message));
	}
}

export function* signOut() {
	try {
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

export function* userSagas() {
	yield takeLatest('user/checkUserSession', isUserAuthenticated);
	yield takeLatest('user/signUpStart', signUp);
	yield takeLatest('user/signUpSuccess', signInAfterSignUp);
	yield takeLatest('user/signInEmailStart', signInWithEmail);
	yield takeLatest('user/signInGoogleStart', signInWithGoogle);
	yield takeLatest('user/signOutStart', signOut);
}
