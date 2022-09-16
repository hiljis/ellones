import { takeLatest, put, call, all, takeEvery } from 'redux-saga/effects';
import { User } from './userSlice';

import { signInSuccess, signInFailed, signOutSuccess, signOutFailed, signUpSuccess, signUpFailed } from './user.action';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signIn,
	signOutUser,
	createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { SIGN_IN_METHOD_EMAIL_PASSWORD } from '../../app/firebase/firebase';

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
		const { user } = yield call(signIn, SIGN_IN_METHOD_EMAIL_PASSWORD, email, password);
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
	const { email, password, displayName } = payload;
	try {
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
		user.displayName = displayName;
		yield put(signUpSuccess(user));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* signInAfterSignUp({ payload }) {
	const { user } = payload;
	yield call(getSnapShotFromUserAuth, user);
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
	yield takeEvery('user/checkUserSession', isUserAuthenticated);
	yield takeEvery('user/signUpEmailStart', signUp);
	yield takeEvery('user/signInEmailStart', signInWithEmail);
	yield takeEvery('user/signInGoogleStart', signInWithGoogle);
	yield takeEvery('user/signOutStart', signOut);
}
