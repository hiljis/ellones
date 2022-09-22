import { useEffect, useState } from 'react';
import { BTC_GENESIS } from '../../../app/utils/consts';
import { dateToYYYYMMDD } from '../../../app/utils/format';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	calcRangeChange,
	changeRangeEnd,
	changeRangeStart,
	selectMarketListRangeEnd,
	selectMarketListRangeStart,
} from '../../../store/marketList/marketListSlice';
import './MarketListRange.scss';

const initRangeState = {
	fromMin: BTC_GENESIS,
	fromMax: dateToYYYYMMDD(new Date()),
	fromVal: '',
	toMin: BTC_GENESIS,
	toMax: dateToYYYYMMDD(new Date()),
	toVal: '',
};

const MarketListRange: React.FC = () => {
	const dispatch = useAppDispatch();
	const [rangeState, setRangeState] = useState(initRangeState);
	const rangeStart = useAppSelector(selectMarketListRangeStart);
	const rangeEnd = useAppSelector(selectMarketListRangeEnd);

	useEffect(() => {
		if (rangeState.fromVal !== '' && rangeState.toVal !== '') {
			dispatch(calcRangeChange());
		}
	}, [rangeState, dispatch]);

	const handleOnRangeFromChange = (e: React.FormEvent<HTMLInputElement>) => {
		const dateStr = e.currentTarget.value;
		setRangeState((prev) => {
			return { ...prev, toMin: dateStr, fromVal: dateStr };
		});
		dispatch(changeRangeStart(dateStr));
	};
	const handleOnRangeToChange = (e: React.FormEvent<HTMLInputElement>) => {
		const dateStr = e.currentTarget.value;
		setRangeState((prev) => {
			return { ...prev, fromMax: dateStr, toVal: dateStr };
		});
		dispatch(changeRangeEnd(dateStr));
	};

	return (
		<>
			<input
				className="marketList__input"
				type="date"
				id="from"
				name="target from"
				min={rangeState.fromMin}
				max={rangeState.fromMax}
				value={rangeStart}
				placeholder="yyyy-mm-dd"
				onChange={handleOnRangeFromChange}
			/>
			<span>&rarr;</span>
			<input
				className="marketList__input"
				type="date"
				id="to"
				name="target to"
				min={rangeState.toMin}
				max={rangeState.toMax}
				value={rangeEnd}
				placeholder="yyyy-mm-dd"
				onChange={handleOnRangeToChange}
			/>
		</>
	);
};

export default MarketListRange;
