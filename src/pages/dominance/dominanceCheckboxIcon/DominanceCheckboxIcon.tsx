import CheckboxIcon from '../../../components/checkboxIcon/CheckboxIcon';
import { selectDominanceIsActiveTicker, toggleTicker } from '../../../store/dominance/dominance.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	fetchMarketData,
	selectMarketDataStatus,
	selectMarketDataStatusByTicker,
} from '../../../store/marketData/marketDataSlice';
import './DominanceCheckboxIcon.scss';

type Props = {
	ticker: string;
};

const DominanceCheckboxIcon: React.FC<Props> = ({ ticker }) => {
	const dispatch = useAppDispatch();
	const tickerMarketDataStatus = useAppSelector((state) => selectMarketDataStatusByTicker(state, ticker));
	const overallMarketDataStatus = useAppSelector(selectMarketDataStatus);
	const isChecked = useAppSelector((state) => selectDominanceIsActiveTicker(state, ticker));

	const handleOnTickerCheck = () => {
		dispatch(toggleTicker(ticker));
	};

	const handleOnReload = () => {
		dispatch(fetchMarketData({ ticker }));
	};

	if (overallMarketDataStatus === 'loading' || overallMarketDataStatus === 'load-failed') {
		if (tickerMarketDataStatus !== 'load-success' && tickerMarketDataStatus !== 'loading') {
			return (
				<div className="dominanceCheckboxIcon dominanceCheckboxIcon--waiting">
					<CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} parentChecked={isChecked} />
				</div>
			);
		}
	}

	if (tickerMarketDataStatus === 'idle') {
		return (
			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--idle" onClick={handleOnReload}>
				<CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} parentChecked={isChecked} />
			</div>
		);
	} else if (tickerMarketDataStatus === 'load-waiting') {
		return (
			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--waiting">
				<CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} parentChecked={isChecked} />
			</div>
		);
	} else if (tickerMarketDataStatus === 'load-failed') {
		return (
			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--failed" onClick={handleOnReload}>
				<CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} parentChecked={isChecked} />
			</div>
		);
	} else if (tickerMarketDataStatus === 'loading') {
		console.log('LOADING');
		return (
			<div className="dominanceCheckboxIcon dominanceCheckboxIcon--loading">
				<CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} parentChecked={isChecked} />
			</div>
		);
	}

	return <CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} parentChecked={isChecked} />;
};

export default DominanceCheckboxIcon;
