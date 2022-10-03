import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { capFirst, formatNumberAndExtractUnit, removeHttps } from '../../app/utils/format';
import { getIcon } from '../../components/icons/Icons';
import Loader from '../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	fetchMarketData,
	selectMarketDataStatusByTicker,
	selectMCapHistory,
	selectPriceHistory,
	selectVolumeHistory,
} from '../../store/marketData/marketDataSlice';
import { fetchProfiles, selectProfile, selectProfilesStatus } from '../../store/profiles/profilesSlice';
import './HeroPresentation.section.scss';

type Props = {
	ticker: string;
};

const HeroPresentation: React.FC<Props> = ({ ticker }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const profilesStatus = useAppSelector(selectProfilesStatus);
	const profile = useAppSelector((state) => selectProfile(state, ticker));
	const marketDataStatus = useAppSelector((state) => selectMarketDataStatusByTicker(state, ticker));
	const priceHistory = useAppSelector((state) => selectPriceHistory(state, ticker));
	const volumeHistory = useAppSelector((state) => selectVolumeHistory(state, ticker));
	const mCapHistory = useAppSelector((state) => selectMCapHistory(state, ticker));

	useEffect(() => {
		if (profilesStatus === 'idle') {
			dispatch(fetchProfiles());
		} else if (!profile) {
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}
	}, [profile, profilesStatus, dispatch, navigate]);

	useEffect(() => {
		if (profile && marketDataStatus === 'load-failed') {
			dispatch(fetchMarketData({ ticker }));
		} else if (profile && (!priceHistory || !volumeHistory || !mCapHistory)) {
			dispatch(fetchMarketData({ ticker }));
		} else if (!profile && marketDataStatus === 'load-failed') {
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}
	}, [profile, priceHistory, volumeHistory, mCapHistory, dispatch, marketDataStatus, ticker, navigate]);

	if (profilesStatus !== 'success' || !profile) return <Loader color="primary"></Loader>;
	if (marketDataStatus !== 'load-success') return <Loader color="primary"></Loader>;

	const { number: mCap, unit: mCapUnit } = formatNumberAndExtractUnit(mCapHistory!.slice(-1)[0].y);
	const price = priceHistory!.slice(-1)[0].y.toFixed(1);
	const { number: volume, unit: volumeUnit } = formatNumberAndExtractUnit(volumeHistory!.slice(-1)[0].y);
	const { number: circSupply, unit: circSupplyUnit } = formatNumberAndExtractUnit(profile.circSupply);
	const { number: maxSupply, unit: maxSupplyUnit } = formatNumberAndExtractUnit(profile.maxSupply);
	const genesisYear = new Date(profile.genesis.seconds * 1000).getFullYear();

	return (
		<section className={`heroPresentation heroPresentation--${ticker}`}>
			<div className="heroPresentation--left">
				<div className="heroPresentation__headerBox">
					<h2 className="heroPresentation__header">{capFirst(profile.name)}</h2>
					{getIcon(ticker, 'icon--sm icon--white')}
				</div>
				<p className="heroPresentation__text">{profile.longDescript}</p>
				<button className="btn btn--invert btn--invert--white" type="button">
					{removeHttps(profile.website)}
				</button>
				<h5 className="heroPresentation__giantTicker">{ticker}</h5>
			</div>

			<div className="heroPresentation--right">
				<div className="heroPresentation__statGrid">
					<div className={`heroPresentation__statBox heroPresentation__statBox--${ticker}`}>
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">{mCap}</span>
							<span className="heroPresentation__stat--unit">{mCapUnit}</span>
						</p>
						<p className="heroPresentation__statTitle">Market Cap</p>
					</div>

					<div className={`heroPresentation__statBox heroPresentation__statBox--${ticker}`}>
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--unit">{'$'}</span>
							<span className="heroPresentation__stat--number">{price}</span>
						</p>
						<p className="heroPresentation__statTitle">Price</p>
					</div>

					<div className={`heroPresentation__statBox heroPresentation__statBox--${ticker}`}>
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">{volume}</span>
							<span className="heroPresentation__stat--unit">{volumeUnit}</span>
						</p>
						<p className="heroPresentation__statTitle">Volume</p>
					</div>

					<div className={`heroPresentation__statBox heroPresentation__statBox--${ticker}`}>
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">{profile.chainType}</span>
							<span className="heroPresentation__stat--unit"></span>
						</p>
						<p className="heroPresentation__statTitle">Security Model</p>
					</div>

					<div className={`heroPresentation__statBox heroPresentation__statBox--${ticker}`}>
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">{circSupply}</span>
							<span className="heroPresentation__stat--unit">{circSupplyUnit}</span>
						</p>
						<p className="heroPresentation__statTitle">Circ. Supply</p>
					</div>

					<div className={`heroPresentation__statBox heroPresentation__statBox--${ticker}`}>
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">
								{parseInt(maxSupply) === 0 ? <>&infin;</> : maxSupply}
							</span>
							<span className="heroPresentation__stat--unit">{maxSupplyUnit}</span>
						</p>
						<p className="heroPresentation__statTitle">Max Supply</p>
					</div>

					<div className={`heroPresentation__statBox heroPresentation__statBox--${ticker}`}>
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">{genesisYear}</span>
							<span className="heroPresentation__stat--unit"></span>
						</p>
						<p className="heroPresentation__statTitle">Genesis</p>
					</div>

					<div className={`heroPresentation__statBox heroPresentation__statBox--${ticker}`}>
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">{profile.dScore}</span>
							<span className="heroPresentation__stat--unit">/ 10</span>
						</p>
						<p className="heroPresentation__statTitle">Decentralization</p>
					</div>
				</div>

				<div className="heroPresentation__chart heroPresentation__chart--white">CHART</div>
			</div>
		</section>
	);
};

export default HeroPresentation;
