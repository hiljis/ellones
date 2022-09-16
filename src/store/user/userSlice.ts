import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface User {
	username: string;
	email: string;
	gender: string;
	age: number;
	occupation: string;
	password?: string;
}

export interface UserState {
	currentUser: User;
	isLoading: boolean;
	error: string;
}

const initialState: UserState = {
	currentUser: {
		username: '',
		email: '',
		gender: '',
		age: 0,
		occupation: '',
		password: '',
	},
	isLoading: false,
	error: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		checkUserSession: (state) => {},
		signInEmailStart: (state) => {
			state.isLoading = true;
		},
		signInGoogleStart: (state) => {
			state.isLoading = true;
		},
		signInSuccess: (state, action: PayloadAction<User>) => {
			state.isLoading = false;
			state.currentUser = action.payload;
		},
		signInFailed: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		signUpEmailStart: (state, action: PayloadAction<User>) => {
			state.isLoading = true;
		},
		signUpSuccess: (state, action: PayloadAction<User>) => {
			state.isLoading = false;
			state.currentUser = action.payload;
		},
		signUpFailed: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		signOutStart: (state) => {
			state.isLoading = true;
		},
		signOutSuccess: (state) => {
			state.isLoading = false;
		},
		signOutFailed: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const {
	checkUserSession,
	signInEmailStart,
	signInGoogleStart,
	signInSuccess,
	signInFailed,
	signUpEmailStart,
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

export default userSlice.reducer;
