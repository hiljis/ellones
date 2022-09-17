import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import profilesReducer from './profiles/profilesSlice';
import marketDataReducer from './marketData/marketDataSlice';
import userReducer from './user/userSlice';
import counterReducer from './counter/counterSlice';

const saga = createSagaMiddleware();
export const store = configureStore({
	reducer: {
		profiles: profilesReducer,
		marketData: marketDataReducer,
		user: userReducer,
		counter: counterReducer,
	},
	middleware: [saga],
});
saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
