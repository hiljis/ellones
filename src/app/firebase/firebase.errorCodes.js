export const firebaseErrorCodeMessages = {
	'auth/email-already-exists': 'The provided email is already in use by an existing user',
	'auth/email-already-in-use': 'The provided email is already in use by an existing user',
	'auth/weak-password': 'The provided password is not good enough.',
	'auth/internal-error': 'Unexpected error while trying to process the request. Please try again later.',
	'auth/invalid-display-name': `Changing the username to an empty value is not allowed.`,
	'auth/invalid-email': 'The provided email is invalid. It must be a string email address.',
	'auth/invalid-password':
		'The provided value for the password user property is invalid. It must be a string with at least six characters.',
	'auth/phone-number-already-exists':
		'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.',
	'auth/user-not-found': 'There is no existing user record corresponding to the provided identifier.',
	'auth/wrong-password': 'The provided password is not corresponding to the provided email.',
	'auth/invalid-id-token': 'INTERNAL',
	'auth/invalid-provider-id': 'INTERNAL',
	'auth/invalid-uid': 'INTERNAL',
	'auth/missing-uid': 'INTERNAL',
	'auth/operation-not-allowed': 'INTERNAL',
	'auth/session-cookie-expired': 'INTERNAL',
	'auth/uid-already-exists': 'INTERNAL',
};
