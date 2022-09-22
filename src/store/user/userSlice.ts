import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../app/utils/types';
import { RootState } from '../store';

export interface UserState {
	currentUser: User | null;
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
	status: 'no-user',
	errors: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		checkUserSession: (state) => {},
		signInEmailStart: (state, action: PayloadAction<User>) => {
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
		signUpStart: (state, action: PayloadAction<User>) => {
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
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
