import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Profile {
	cgId: string;
	chainType: string;
	circSupply: string;
	dScore: number;
	discord: string;
	ecoScore: number;
	genesis: Date;
	github: string;
	inflation: number;
	maxSupply: number;
	name: string;
	ticker: string;
	tps: number;
	twitter: string;
	website: string;
	youtube: string;
}

export type ProfilesState = {
	profiles: Profile[];
	isLoading: boolean;
	error: string;
};

const initialState: ProfilesState = {
	profiles: [],
	isLoading: false,
	error: '',
};

export const profilesSlice = createSlice({
	name: 'profiles',
	initialState,
	reducers: {
		fetchProfiles: (state) => {
			state.isLoading = true;
		},
		fetchProfilesSuccess: (state, action: PayloadAction<Profile[]>) => {
			state.isLoading = false;
			state.profiles = action.payload;
		},
		fetchProfilesFailed: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchProfiles, fetchProfilesSuccess, fetchProfilesFailed } = profilesSlice.actions;

export const selectProfile = (state: RootState, name: string) =>
	state.profiles.profiles.filter((profile) => profile.name === name)[0];
export const selectProfiles = (state: RootState) => state.profiles.profiles;

export default profilesSlice.reducer;
