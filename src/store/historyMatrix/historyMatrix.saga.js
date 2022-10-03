import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	DAYS_1M_BACK,
	DAYS_1W_BACK,
	DAYS_1Y_BACK,
	DAYS_24H_BACK,
	DAYS_3M_BACK,
	DAYS_3Y_BACK,
	DAYS_6M_BACK,
} from '../../app/utils/consts';
import { calcHistoryDataFailed, calcHistoryDataSuccess } from './historyMatrix.slice';

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

// Datapoints are closing data on that specific day -> the close is the open of the day after
const convertToHistoryData = async (marketData) => {
	try {
		const data = [];

		let prevYear;
		let prevMonth;
		let currentYearData;

		marketData.forEach((dp, i) => {
			const date = new Date(dp.x);
			const currentYear = date.getUTCFullYear();
			const currentMonth = date.getUTCMonth() + 1;
			const currentPrice = dp.y;

			// First data point
			if (i === 0) {
				// Remember year and month
				prevYear = currentYear;
				prevMonth = currentMonth;

				// First month will be comlpete.
				// However, it change change if later in the loop if data doesn't span across month end.
				const isMonthComplete = date.getDate() === 1;

				currentYearData = {
					year: currentYear,
					months: [{ month: currentMonth, open: currentPrice, close: -1, complete: isMonthComplete }],
				};
			}

			// New month
			if (currentMonth !== prevMonth) {
				// debugger;
				const priceOnLastDayOfPrevMonth = marketData[i - 1].y;
				// Add price of previous day (last of month) to close of last month added
				// const prevMonth = currentYearData.months[currentYearData.months.length - 1];
				const prevMonthData = currentYearData.months.filter((monthData) => monthData.month === prevMonth)[0];
				prevMonthData.close = priceOnLastDayOfPrevMonth;
				prevMonthData.change = ((prevMonthData.close - prevMonthData.open) / prevMonthData.open) * 100;

				// If it's not the first month ever then it's complete
				if (!('complete' in prevMonthData)) {
					prevMonthData.complete = true;
				}

				// Add new monthData if it's not a new year
				if (currentYear === prevYear) {
					currentYearData.months.push({ month: currentMonth, open: priceOnLastDayOfPrevMonth, close: -1 });
				}
				prevMonth = currentMonth;
			}

			// New year
			if (currentYear !== prevYear) {
				// debugger;
				currentYearData.complete = true;

				if (currentYearData.months.length < 12) {
					// Not a complete year if it doesn't have 12 months of data
					currentYearData.complete = false;

					// Fill missing months before first month with data representing an empty month
					const THIRTEEN_MONT3S = 13;
					const firstMonthWithData = currentYearData.months.reduce((acc, prev) => {
						return prev.month < acc ? prev.month : acc;
					}, THIRTEEN_MONT3S);

					for (let i = 1; i < firstMonthWithData; i++) {
						currentYearData.months.push({ month: i, complete: false, open: -1, close: -1, change: -100 });
					}
				}
				// Add complete yearData to start of history
				data.unshift({ ...currentYearData });

				// Create new yearData
				const priceOnLastDayOfPrevYear = marketData[i - 1].y;
				currentYearData = {
					year: currentYear,
					months: [{ month: currentMonth, open: priceOnLastDayOfPrevYear, close: -1 }],
				};
				prevYear = currentYear;
			}

			// Last data point
			if (i === marketData.length - 1) {
				const currentMonthData = currentYearData.months.filter(
					(monthData) => monthData.month === currentMonth
				)[0];
				const lastPrice = dp.y;
				currentMonthData.close = lastPrice;
				currentMonthData.change =
					((currentMonthData.close - currentMonthData.open) / currentMonthData.open) * 100;
				currentMonthData.complete = false;
				currentYearData.complete = false;

				// Fill missing months after last month with data representing an empty month
				for (let i = currentMonth + 1; i <= 12; i++) {
					currentYearData.months.push({ month: i, complete: false, open: -1, close: -1, change: -100 });
				}
				data.unshift({ ...currentYearData });
			}
		});
		const sortedData = data.map((year) => {
			return { ...year, months: year.months.sort((a, b) => a.month - b.month) };
		});
		return sortedData;
	} catch (err) {
		throw err;
	}
};

export function* calcHistoryData({ payload }) {
	const { ticker, priceHistory, mCapHistory, volumeHistory } = payload;
	try {
		const priceData = yield call(convertToHistoryData, priceHistory);
		const mCapData = yield call(convertToHistoryData, mCapHistory);
		const volumeData = yield call(convertToHistoryData, volumeHistory);
		yield put(calcHistoryDataSuccess({ ticker: ticker, price: priceData, mCap: mCapData, volume: volumeData }));
	} catch (err) {
		yield put(calcHistoryDataFailed({ ticker: ticker, error: err }));
	}
}

export function* historyMatrixSaga() {
	yield takeEvery('historyMatrix/calcHistoryDataStart', calcHistoryData);
}

export default historyMatrixSaga;
