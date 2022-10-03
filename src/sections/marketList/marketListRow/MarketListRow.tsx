import { formatNumberAndExtractUnit } from '../../../app/utils/format';
import Loader from '../../../components/loader/loader';
import { ActiveData, MarketListRowModel, selectRowDataStatusByTicker } from '../../../store/marketList/marketListSlice';
import PercentDot from './percentDot/PercentDot';
import './MarketListRow.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	fetchMarketData,
	selectMarketDataStatus,
	selectMarketDataStatusByTicker,
} from '../../../store/marketData/marketDataSlice';
import { ReactComponent as IconReload } from '../../../assets/svg/icon_reload.svg';

type Props = {
	data: MarketListRowModel;
	activeData: ActiveData;
};

const MarketListRow: React.FC<Props> = ({ data, activeData }) => {
	const ticker = data.ticker;
	const dispatch = useAppDispatch();
	const calcStatus = useAppSelector((state) => selectRowDataStatusByTicker(state, ticker));
	const loadStatus = useAppSelector((state) => selectMarketDataStatusByTicker(state, ticker));
	const overallMarketDataStatus = useAppSelector(selectMarketDataStatus);

	const handleOnReload = () => {
		dispatch(fetchMarketData({ ticker }));
	};

	if (overallMarketDataStatus === 'loading' || overallMarketDataStatus === 'load-failed') {
		if (loadStatus !== 'load-success' && loadStatus !== 'loading') {
			return (
				<li className="marketList__listRow waiting">
					<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
				</li>
			);
		}
	}
	if (loadStatus === 'idle' || loadStatus === 'load-failed') {
		return (
			<li className="marketList__listRow reload" onClick={handleOnReload}>
				<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
				<IconReload className="icon--xs icon--primaryStroke col--all" />
			</li>
		);
	} else if (loadStatus === 'load-waiting') {
		return (
			<li className="marketList__listRow waiting">
				<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
			</li>
		);
	} else if (loadStatus === 'loading' || calcStatus !== 'calc-success') {
		return (
			<li className="marketList__listRow loading">
				<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
				<Loader color="primary" size="sm" className="col--all" />
			</li>
		);
	}

	const { number: mCap, unit: mCapUnit } = formatNumberAndExtractUnit(data.currentMCap);
	return (
		<li className="marketList__listRow">
			<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
			<span className="rowItem col--price">${data.currentPrice.toFixed(2)}</span>
			<PercentDot className="rowItem col--24h">{data[activeData]['24h']}</PercentDot>
			<PercentDot className="rowItem col--1w">{data[activeData]['1w']}</PercentDot>
			<PercentDot className="rowItem col--1m">{data[activeData]['1m']}</PercentDot>
			<PercentDot className="rowItem col--3m">{data[activeData]['3m']}</PercentDot>
			<PercentDot className="rowItem col--6m">{data[activeData]['6m']}</PercentDot>
			<PercentDot className="rowItem col--1y">{data[activeData]['1y']}</PercentDot>
			<PercentDot className="rowItem col--3y">{data[activeData]['3y']}</PercentDot>
			<PercentDot className="rowItem col--range">{data[activeData]['range']}</PercentDot>
			<span className="rowItem col--mCap">{`${mCap} ${mCapUnit}`}</span>
		</li>
	);
};

export default MarketListRow;
