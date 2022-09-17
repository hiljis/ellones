import { takeLatest, put, call, all } from 'redux-saga/effects';

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
	const { email, password, username, gender, age, occupation } = payload;
	try {
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
		user.username = username;
		user.gender = gender;
		user.age = age;
		user.occupation = occupation;
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
	yield all([
		call(yield takeLatest('user/checkUserSession', isUserAuthenticated)),
		call(yield takeLatest('user/signUpStart', signUp)),
		call(yield takeLatest('user/signUpSuccess', signInAfterSignUp)),
		call(yield takeLatest('user/signInEmailStart', signInWithEmail)),
		call(yield takeLatest('user/signInGoogleStart', signInWithGoogle)),
		call(yield takeLatest('user/signOutStart', signOut)),
	]);
}
