import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDbai7su74h_qRonOBJ91cv7bQa1jlJ0yM',
	authDomain: 'ellones.firebaseapp.com',
	databaseURL: 'https://ellones-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'ellones',
	storageBucket: 'ellones.appspot.com',
	messagingSenderId: '369190168493',
	appId: '1:369190168493:web:3a76c678380386b20fa324',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();

export const db = getFirestore();

// CREATE AUTH USER
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	try {
		const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
		return userCredentials;
	} catch (err) {
		throw err;
	}
};

// CREATE USER DOCUMENT
export const createUserDocumentFromAuth = async (userAuth) => {
	if (!userAuth) return;
	try {
		const userDocRef = doc(db, 'users', userAuth.uid);
		const userSnapShot = await getDoc(userDocRef);

		if (!userSnapShot.exists()) {
			await setDoc(userDocRef, { ...userAuth });
		}

		return userSnapShot;
	} catch (error) {
		throw error;
	}
};

////////////////////////////////////////////////////////////////////////////////////////////
// SIGN IN
////////////////////////////////////////////////////////////////////////////////////////////
export const SIGN_IN_METHOD_EMAIL_PASSWORD = 20;

export const signInUser = async (method, email, password) => {
	if (method === SIGN_IN_METHOD_EMAIL_PASSWORD) {
		if (!email || !password) return;
		try {
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			return userCredentials;
		} catch (err) {
			throw err;
		}
	}
};
export const signInWithGooglePopup = async () => {
	try {
		const userCredentials = await signInWithPopup(auth, googleProvider);
		return userCredentials;
	} catch (err) {
		throw err;
	}
};
export const signInWithGoogleRedirect = async () => {
	try {
		const userCredentials = await signInWithRedirect(auth, googleProvider);
		return userCredentials;
	} catch (err) {
		throw err;
	}
};

////////////////////////////////////////////////////////////////////////////////////////////
// SIGN OUT
////////////////////////////////////////////////////////////////////////////////////////////
export const signOutUser = async () => {
	try {
		await signOut(auth);
	} catch (err) {
		throw err;
	}
};

////////////////////////////////////////////////////////////////////////////////////////////
// USER STATE
////////////////////////////////////////////////////////////////////////////////////////////
export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
			unsubscribe();
			resolve(userAuth);
		});
	});
};

onAuthStateChanged(auth, (userAuth) => {
	if (userAuth) {
		console.log('signed in: ', userAuth);
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		const uid = userAuth.uid;
		// ...
	} else {
		console.log('sign out');
		// User is signed out
		// ...
	}
});

export const onAuthStateChangedListener = (callback) => {
	return onAuthStateChanged(auth, callback);
};

////////////////////////////////////////////////////////////////////////////////////////////
// FIRESTORE
////////////////////////////////////////////////////////////////////////////////////////////
// GET ALL L1 PROFILES
export const getProfiles = async () => {
	const collectionRef = collection(db, 'profiles');
	const q = query(collectionRef);

	try {
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, documentKey) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object[documentKey].toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('DONE');
};
