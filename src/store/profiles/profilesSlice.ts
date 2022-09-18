import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Profile {
	cgId: string;
	chainType: string;
	circSupply: number;
	dScore: number;
	discord: string;
	ecoScore: number;
	genesis: { seconds: number; nanoseconds: number };
	github: string;
	inflation: number;
	maxSupply: number;
	name: string;
	ticker: string;
	tps: number;
	twitter: string;
	website: string;
	youtube: string;
	shortDescript: string;
	longDescript: string;
}

export type ProfilesState = {
	profiles: Profile[];
	status: 'idle' | 'loading' | 'failed' | 'success';
	error: string;
};

const initialState: ProfilesState = {
	profiles: [],
	status: 'idle',
	error: '',
};

export const profilesSlice = createSlice({
	name: 'profiles',
	initialState,
	reducers: {
		fetchProfiles: (state) => {
			state.status = 'loading';
		},
		fetchProfilesSuccess: (state, action: PayloadAction<Profile[]>) => {
			state.status = 'success';
			state.profiles = action.payload;
		},
		fetchProfilesFailed: (state, action: PayloadAction<string>) => {
			state.status = 'failed';
			state.error = action.payload;
		},
	},
});

export const { fetchProfiles, fetchProfilesSuccess, fetchProfilesFailed } = profilesSlice.actions;

export const selectProfile = (state: RootState, ticker: string) =>
	state.profiles.profiles.filter((profile) => profile.ticker === ticker)[0];

export const selectProfiles = (state: RootState) => state.profiles.profiles;

export const selectIsValidTicker = (state: RootState, ticker: string) => {
	const profileWithTicker = state.profiles.profiles.filter((profile) => profile.ticker === ticker);
	return profileWithTicker.length === 0 ? false : true;
};

export const selectProfilesStatus = (state: RootState) => {
	return state.profiles.status;
};

export default profilesSlice.reducer;
