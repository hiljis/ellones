import { Dispatch } from '@reduxjs/toolkit';
import { ReactComponent as IconDownload } from '../../../../assets/svg/icon_download.svg';
import { ReactComponent as IconReload } from '../../../../assets/svg/icon_reload.svg';
import Loader from '../../../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
	fetchTickerReset,
	fetchTickerStart,
	selectMarketDataStatusByTicker,
} from '../../../../store/marketData/marketDataSlice';
import './HistoryStateMessage.scss';

type Props = {
	ticker: string;
};

export const HistoryStateMessage: React.FC<Props> = ({ ticker }) => {
	const dispatch = useAppDispatch();
	const loadStatus = useAppSelector((state) => selectMarketDataStatusByTicker(state, ticker));

	const handleOnClick = () => {
		if (loadStatus === 'idle') dispatch(fetchTickerStart(ticker));
		else if (loadStatus === 'load-failed') dispatch(fetchTickerReset(ticker));
	};

	if (loadStatus === 'idle') {
		return (
			<p className={`historyStateMessage ${loadStatus}`} onClick={handleOnClick}>
				{`Load data for ${ticker}`}
				<IconDownload className="icon--xs icon--primaryStroke" />
			</p>
		);
	} else if (loadStatus === 'loading') {
		return <Loader color="primary" size="md" thickness="thin" />;
	} else if (loadStatus === 'load-failed') {
		return (
			<p className={`historyStateMessage ${loadStatus}`} onClick={handleOnClick}>
				{`Failed to load data for ${ticker}`}
				<IconReload className="icon--xs icon--warningStroke" />
			</p>
		);
	} else {
		return <p className={`historyStateMessage`}>Select chain in the upper left corner</p>;
	}
};
