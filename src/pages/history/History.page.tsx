import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoSelectorGrid from '../../components/logoSelectorGrid/LogoSelectorGrid';
import OverlayFull from '../../components/overlayFull/OverlayFull';
import { selectTicker } from '../../store/historyMatrix/historyMatrix.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMarketData, selectMarketDataTickerStatus } from '../../store/marketData/marketDataSlice';
import { fetchProfiles, selectProfile, selectProfilesStatus } from '../../store/profiles/profilesSlice';
import './History.page.scss';
import HistoryMatrix from './historyMatrix/HistoryMatrix';

const HistoryPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const ticker = useAppSelector(selectTicker);
	const profile = useAppSelector((state) => selectProfile(state, ticker));
	const marketDataStatus = useAppSelector((state) => selectMarketDataTickerStatus(state, ticker));

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		console.log(marketDataStatus);
		if (profile && (marketDataStatus === 'idle' || marketDataStatus === null)) {
			dispatch(fetchMarketData({ ticker }));
		} else if (!profile && marketDataStatus === 'failed') {
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}
	}, [profile, dispatch, marketDataStatus, ticker, navigate]);

	return (
		<main className="historyPage">
			<div className="pageHeader">
				<h3 className="pageHeader--text">History by month</h3>
			</div>
			<HistoryMatrix />
		</main>
	);
};

export default HistoryPage;
