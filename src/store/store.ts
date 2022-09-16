import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import profilesSaga from './profiles/profilesSaga';
import profilesReducer from './profiles/profilesSlice';
import userReducer from './user/userSlice';
import counterReducer from './counter/counterSlice';

const saga = createSagaMiddleware();
export const store = configureStore({
	reducer: {
		profiles: profilesReducer,
		user: userReducer,
		counter: counterReducer,
	},
	middleware: [saga],
});
saga.run(profilesSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
