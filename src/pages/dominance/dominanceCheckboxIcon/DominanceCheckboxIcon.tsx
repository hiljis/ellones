import CheckboxIcon from '../../../components/checkboxIcon/CheckboxIcon';
import { selectDominanceIsActiveTicker, toggleTicker } from '../../../store/dominance/dominance.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	fetchTickerReset,
	fetchTickerStart,
	fetchTickerStop,
	selectMarketDataStatus,
	selectMarketDataStatusByTicker,
} from '../../../store/marketData/marketDataSlice';
import './DominanceCheckboxIcon.scss';

type Props = {
	ticker: string;
};

const DominanceCheckboxIcon: React.FC<Props> = ({ ticker }) => {
	const dispatch = useAppDispatch();
	const loadStatus = useAppSelector((state) => selectMarketDataStatusByTicker(state, ticker));
	const overallMarketDataStatus = useAppSelector(selectMarketDataStatus);
	const isChecked = useAppSelector((state) => selectDominanceIsActiveTicker(state, ticker));

	const handleOnTickerCheck = () => {
		dispatch(toggleTicker(ticker));
	};

	const handleOnClick = () => {
		if (loadStatus === 'idle') dispatch(fetchTickerStart(ticker));
		if (loadStatus === 'load-waiting') dispatch(fetchTickerStop(ticker));
		if (loadStatus === 'load-failed') dispatch(fetchTickerReset(ticker));
	};

	// if (overallMarketDataStatus === 'loading' || overallMarketDataStatus === 'load-failed') {
	// 	if (loadStatus !== 'load-success' && loadStatus !== 'loading') {
	// 		return (
	// 			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--waiting">
	// 				<CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} parentChecked={isChecked} />
	// 			</div>
	// 		);
	// 	}
	// }

	if (loadStatus === 'idle') {
		return (
			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--idle" onClick={handleOnClick}>
				<CheckboxIcon
					ticker={ticker}
					// checkHandler={handleOnTickerCheck}
					// parentChecked={isChecked}
					color="primary"
				/>
			</div>
		);
	} else if (loadStatus === 'load-waiting') {
		return (
			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--waiting" onClick={handleOnClick}>
				<CheckboxIcon
					ticker={ticker}
					// checkHandler={handleOnTickerCheck}
					// parentChecked={isChecked}
					color="primary"
				/>
			</div>
		);
	} else if (loadStatus === 'load-failed') {
		return (
			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--failed" onClick={handleOnClick}>
				<CheckboxIcon ticker={ticker} color="warning" />
			</div>
		);
	} else if (loadStatus === 'loading') {
		return (
			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--loading">
				<CheckboxIcon
					ticker={ticker}
					// checkHandler={handleOnTickerCheck}
					// parentChecked={isChecked}
					color="primary"
				/>
			</div>
		);
	}

	return <CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} parentChecked={isChecked} />;
};

export default DominanceCheckboxIcon;
