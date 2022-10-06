import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSignIn, UserSignUp } from '../../app/utils/types';
import { RootState } from '../store';

type UpdateStatus =
	| 'idle'
	| 'updating-fav-chain'
	| 'update-fav-chain-success'
	| 'update-fav-chain-failed'
	| 'updating-username'
	| 'update-username-success'
	| 'update-username-failed'
	| 'updating-email'
	| 'update-email-success'
	| 'update-email-failed'
	| 'confirming-password'
	| 'confirm-password-success'
	| 'confirm-password-failed'
	| 'updating-password'
	| 'update-password-success'
	| 'update-password-failed';

export interface UserState {
	currentUser: User | null;
	updateStatus: UpdateStatus;
	status:
		| 'signing-in'
		| 'signing-out'
		| 'signing-up'
		| 'sign-in-success'
		| 'no-user'
		| 'sign-up-success'
		| 'sign-in-failed'
		| 'sign-out-failed'
		| 'sign-up-failed';
	errors: string[];
}

const initialState: UserState = {
	currentUser: null,
	updateStatus: 'idle',
	status: 'no-user',
	errors: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		checkUserSession: (state) => {},
		signInEmailStart: (state, action: PayloadAction<UserSignIn>) => {
			state.status = 'signing-in';
		},
		signInGoogleStart: (state) => {
			state.status = 'signing-in';
		},
		signInSuccess: (state, action: PayloadAction<User>) => {
			state.status = 'sign-in-success';
			state.currentUser = action.payload;
		},
		signInFailed: (state, action: PayloadAction<string>) => {
			state.status = 'sign-in-failed';
			state.errors.push(action.payload);
		},
		signUpStart: (state, action: PayloadAction<UserSignUp>) => {
			state.status = 'signing-up';
		},
		signUpSuccess: (state, action: PayloadAction<User>) => {
			console.log(action.payload);
			state.status = 'sign-up-success';
		},
		signUpFailed: (state, action: PayloadAction<string>) => {
			state.status = 'sign-up-failed';
			state.errors.push(action.payload);
		},
		signOutStart: (state) => {
			state.status = 'signing-out';
		},
		signOutSuccess: (state) => {
			state.status = 'no-user';
			state.currentUser = null;
		},
		signOutFailed: (state, action: PayloadAction<string>) => {
			state.status = 'sign-out-failed';
			state.errors.push(action.payload);
		},
		updateFavChainStart: (state, action: PayloadAction<string>) => {
			state.updateStatus = 'updating-fav-chain';
		},
		updateFavChainSuccess: (state, action: PayloadAction<string>) => {
			const newFavChain = action.payload;
			if (state.currentUser) {
				state.currentUser = { ...state.currentUser, favChain: newFavChain };
				state.updateStatus = 'update-fav-chain-success';
			}
		},
		updateFavChainFailed: (state, action: PayloadAction<string>) => {
			const error = action.payload;
			state.updateStatus = 'update-fav-chain-failed';
			state.errors.push(error);
		},
		updateUsernameStart: (state, action: PayloadAction<string>) => {
			state.updateStatus = 'updating-username';
		},
		updateUsernameSuccess: (state, action: PayloadAction<string>) => {
			const newUsername = action.payload;
			if (state.currentUser) {
				state.currentUser = { ...state.currentUser, username: newUsername };
				state.updateStatus = 'update-username-success';
			}
		},
		updateUsernameFailed: (state, action: PayloadAction<string>) => {
			const error = action.payload;
			state.updateStatus = 'update-username-failed';
			state.errors.push(error);
		},
		updateEmailStart: (state, action: PayloadAction<string>) => {
			state.updateStatus = 'updating-email';
		},
		updateEmailSuccess: (state, action: PayloadAction<string>) => {
			const newEmail = action.payload;
			if (state.currentUser) {
				state.currentUser = { ...state.currentUser, email: newEmail };
				state.updateStatus = 'update-email-success';
			}
		},
		updateEmailFailed: (state, action: PayloadAction<string>) => {
			const error = action.payload;
			state.updateStatus = 'update-email-failed';
			state.errors.push(error);
		},
		confirmPasswordStart: (state, action: PayloadAction<string>) => {
			state.updateStatus = 'confirming-password';
		},
		confirmPasswordSuccess: (state) => {
			state.updateStatus = 'confirm-password-success';
		},
		confirmPasswordFailed: (state, action: PayloadAction<string>) => {
			const error = action.payload;
			state.updateStatus = 'confirm-password-failed';
			state.errors.push(error);
		},
		updatePasswordStart: (state, action: PayloadAction<string>) => {
			state.updateStatus = 'updating-password';
		},
		updatePasswordSuccess: (state) => {
			state.updateStatus = 'update-password-success';
		},
		updatePasswordFailed: (state, action: PayloadAction<string>) => {
			const error = action.payload;
			state.updateStatus = 'update-password-failed';
			state.errors.push(error);
		},
		setUpdateStatus: (state, action: PayloadAction<UpdateStatus>) => {
			state.updateStatus = action.payload;
		},
	},
});

export const {
	checkUserSession,
	signInEmailStart,
	signInGoogleStart,
	signInSuccess,
	signInFailed,
	signUpStart,
	signUpSuccess,
	signUpFailed,
	signOutStart,
	signOutSuccess,
	signOutFailed,
	updateFavChainStart,
	updateFavChainSuccess,
	updateFavChainFailed,
	updateUsernameStart,
	updateUsernameSuccess,
	updateUsernameFailed,
	updateEmailStart,
	updateEmailSuccess,
	updateEmailFailed,
	confirmPasswordStart,
	confirmPasswordSuccess,
	confirmPasswordFailed,
	updatePasswordStart,
	updatePasswordSuccess,
	updatePasswordFailed,
	setUpdateStatus,
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUpdateStatus = (state: RootState) => state.user.updateStatus;
export const selectFavChain = (state: RootState) => {
	if (state.user.currentUser) return state.user.currentUser.favChain;
	else return '';
};
export const selectUsername = (state: RootState) => {
	if (state.user.currentUser) return state.user.currentUser.username;
	else return '';
};
export const selectEmail = (state: RootState) => {
	if (state.user.currentUser) return state.user.currentUser.email;
	else return '';
};

export default userSlice.reducer;
