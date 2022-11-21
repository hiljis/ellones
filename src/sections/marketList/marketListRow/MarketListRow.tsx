import { ReactComponent as IconReload } from '../../../assets/svg/icon_reload.svg';
import { ReactComponent as IconDownload } from '../../../assets/svg/icon_download.svg';
import Loader from '../../../components/loader/loader';
import PercentBox from './percentBox/PercentBox';
import { formatNumberAndExtractUnit } from '../../../app/utils/format';
import { ActiveData, MarketListRowModel } from '../../../store/marketList/marketListSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	selectMarketDataStatusByTicker,
	fetchTickerStart,
	fetchTickerStop,
	fetchTickerReset,
} from '../../../store/marketData/marketDataSlice';
import './MarketListRow.scss';

type Props = {
	data: MarketListRowModel;
	activeData: ActiveData;
};

const MarketListRow: React.FC<Props> = ({ data, activeData }) => {
	const ticker = data.ticker;
	const dispatch = useAppDispatch();
	const loadStatus = useAppSelector((state) => selectMarketDataStatusByTicker(state, ticker));

	const handleOnClick = () => {
		if (loadStatus === 'idle') dispatch(fetchTickerStart(ticker));
		if (loadStatus === 'load-waiting') dispatch(fetchTickerStop(ticker));
		if (loadStatus === 'load-failed') dispatch(fetchTickerReset(ticker));
	};

	if (loadStatus === 'idle') {
		return (
			<li className="marketList__listRow idle" onClick={handleOnClick}>
				<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
				<IconDownload className="icon--xs icon--primaryStroke col--all" />
			</li>
		);
	} else if (loadStatus === 'loading') {
		return (
			<li className="marketList__listRow loading">
				<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
				<Loader color="primary" size="xs" thickness="thin" className="col--all" />
			</li>
		);
	} else if (loadStatus === 'load-waiting') {
		return (
			<li className="marketList__listRow waiting" onClick={handleOnClick}>
				<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
				<div className="waitDots col--all">
					<span className="waitDot waitDot--1"></span>
					<span className="waitDot waitDot--2"></span>
					<span className="waitDot waitDot--3"></span>
				</div>
			</li>
		);
	} else if (loadStatus === 'load-failed') {
		return (
			<li className="marketList__listRow failed" onClick={handleOnClick}>
				<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
				<IconReload className="icon--xs icon--blackStroke col--all" />
			</li>
		);
	}

	const { number: mCap, unit: mCapUnit } = formatNumberAndExtractUnit(data.currentMCap);
	return (
		<li className="marketList__listRow">
			<span className="rowItem col--ticker">{data.ticker.toUpperCase()}</span>
			<span className="rowItem col--price">${data.currentPrice.toFixed(2)}</span>
			<PercentBox className="rowItem col--24h">{data[activeData]['24h']}</PercentBox>
			<PercentBox className="rowItem col--1w">{data[activeData]['1w']}</PercentBox>
			<PercentBox className="rowItem col--1m">{data[activeData]['1m']}</PercentBox>
			<PercentBox className="rowItem col--3m">{data[activeData]['3m']}</PercentBox>
			<PercentBox className="rowItem col--6m">{data[activeData]['6m']}</PercentBox>
			<PercentBox className="rowItem col--1y">{data[activeData]['1y']}</PercentBox>
			<PercentBox className="rowItem col--3y">{data[activeData]['3y']}</PercentBox>
			<PercentBox className="rowItem col--range">{data[activeData]['range']}</PercentBox>
			<span className="rowItem col--mCap">{`${mCap} ${mCapUnit}`}</span>
		</li>
	);
};

export default MarketListRow;
