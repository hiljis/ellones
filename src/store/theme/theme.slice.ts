import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type GlobalTheme = 'light' | 'dark' | 'blue';

interface ThemeState {
	globalTheme: GlobalTheme;
	localTheme: string;
	status: string;
	error: '';
}

const initialState: ThemeState = {
	globalTheme: 'light',
	localTheme: '',
	status: 'idle',
	error: '',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setGlobalTheme: (state, action: PayloadAction<GlobalTheme>): void => {
			state.globalTheme = action.payload;
		},
		setLocalTheme: (state, action: PayloadAction<string>): void => {
			state.localTheme = action.payload;
		},
	},
});

export const { setGlobalTheme, setLocalTheme } = themeSlice.actions;

export const selectGlobalTheme = (state: RootState) => {
	if (state.theme.localTheme !== '') return state.theme.localTheme;
	return state.theme.globalTheme;
};
export const selectLocalTheme = (state: RootState) => state.theme.localTheme;

// export const selectProfiles = (state: RootState) => state.profiles.profiles;

// export const selectIsValidTicker = (state: RootState, ticker: string) => {
// 	const profileWithTicker = state.profiles.profiles.filter((profile) => profile.ticker === ticker);
// 	return profileWithTicker.length === 0 ? false : true;
// };

// export const selectProfilesStatus = (state: RootState) => {
// 	return state.profiles.status;
// };

// export const selectTickers = (state: RootState) => {
// 	return state.profiles.profiles.map((profile) => profile.ticker);
// };

export default themeSlice.reducer;
