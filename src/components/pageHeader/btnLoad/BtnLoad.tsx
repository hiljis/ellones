import { ReactComponent as IconDownload } from '../../../assets/svg/icon_download.svg';
import { ReactComponent as IconStop } from '../../../assets/svg/icon_stop.svg';
import { ReactComponent as IconClose } from '../../../assets/svg/icon_close.svg';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	fetchAllReset,
	fetchAllStart,
	fetchAllStop,
	selectMarketDataStatus,
} from '../../../store/marketData/marketDataSlice';
import './BtnLoad.scss';
import { Fragment, useEffect, useState } from 'react';

const BtnLoad: React.FC = () => {
	const dispatch = useAppDispatch();
	const loadStatus = useAppSelector(selectMarketDataStatus);
	const [icon, setIcon] = useState(<></>);
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (loadStatus === 'idle') {
			setIcon(<IconDownload className="icon--xxs icon--primaryStroke" />);
			setMessage('Load all data');
		} else if (loadStatus === 'load-incomplete') {
			setIcon(<IconDownload className="icon--xxs icon--primaryStroke" />);
			setMessage('Load all data');
		} else if (loadStatus === 'load-failed') {
			setIcon(<IconClose className="icon--xxs icon--whiteStroke" />);
			setMessage('Failed to load all');
		} else if (loadStatus === 'load-failed-still-loading') {
			setIcon(<IconStop className="icon--xxs icon--warningStroke" />);
			setMessage('Failed to load all');
		} else if (loadStatus === 'loading') {
			setIcon(<IconStop className="icon--xxs icon--primaryStroke" />);
			setMessage('Loading...');
		} else if (loadStatus === 'load-complete') {
			setIcon(<IconCheck className="icon--xxs icon--whiteStroke" />);
			setMessage('Load complete');
		}
	}, [loadStatus]);

	const handleOnClick = () => {
		if (loadStatus === 'loading') dispatch(fetchAllStop());
		else if (loadStatus === 'idle') dispatch(fetchAllStart());
		else if (loadStatus === 'load-incomplete') dispatch(fetchAllStart());
		else if (loadStatus === 'load-failed') dispatch(fetchAllReset());
		else if (loadStatus === 'load-failed-still-loading') dispatch(fetchAllStop());
		// else loading is complete - do nothing
	};

	return (
		<div className={`btnLoadContainer ${loadStatus}`}>
			<p className={`btnLoadMessage ${loadStatus}`}>{message}</p>
			<button className={`btnLoad ${loadStatus}`} type="button" onClick={handleOnClick}>
				{icon}
			</button>
		</div>
	);
};

export default BtnLoad;
