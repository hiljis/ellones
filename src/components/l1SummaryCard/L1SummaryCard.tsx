import { capFirst, formatNumberAndExtractUnit, removeHttps } from '../../app/utils/format';
import { useAppSelector } from '../../store/hooks';
import { selectProfile } from '../../store/profiles/profilesSlice';
import { getIcon } from '../icons/Icons';
import LinkButton from '../linkButton/LinkButton';
import LinkSocial from '../linkSocial/LinkSocial';
import LinkText from '../linkText/LinkText';
import './L1SummaryCard.scss';

type Props = {
	ticker: string;
};

const L1SummaryCard: React.FC<Props> = ({ ticker }) => {
	const profile = useAppSelector((state) => selectProfile(state, ticker));
	const genesisYear = new Date(profile.genesis.seconds * 1000).getFullYear();
	const { number: tps, unit: tpsUnit } = formatNumberAndExtractUnit(profile.tps);
	const { number: circSupply, unit: circSupplyUnit } = formatNumberAndExtractUnit(profile.circSupply);
	let { number: maxSupply, unit: maxSupplyUnit } =
		profile.maxSupply === 0 ? { number: '-', unit: '' } : formatNumberAndExtractUnit(profile.maxSupply);
	return (
		<aside className="layer1SummaryCard" id="bitcoin">
			<div className="layer1__box layer1__info">
				<div className="layer1__info__header">
					<h4>{capFirst(profile.name)}</h4>
					<div className="tags">
						<span className="tag">{genesisYear}</span>
						<span className="tag">{profile.chainType}</span>
					</div>
				</div>
				<p className="layer1__info--description">{profile.shortDescript}</p>
				<div className="layer1__info__links">
					<LinkText to={profile.website} type="resource">
						{removeHttps(profile.website)}
					</LinkText>
					<div className="layer1__info__socials">
						{profile.twitter && <LinkSocial plattform="twitter" href={profile.twitter} withText={false} />}
						{profile.github && <LinkSocial plattform="github" href={profile.github} withText={false} />}
						{profile.discord && <LinkSocial plattform="discord" href={profile.discord} withText={false} />}
						{profile.youtube && <LinkSocial plattform="youtube" href={profile.youtube} withText={false} />}
					</div>
				</div>
			</div>

			<div className="layer1__box layer1__stats">
				<div className="layer1__stats__grid">
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">{tps}</span>
							<span className="layer1__stat__unit">{tpsUnit}</span>
						</div>
						<span className="layer1__stat__title">TPS</span>
					</div>
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">{circSupply}</span>
							<span className="layer1__stat__unit">{circSupplyUnit}</span>
						</div>
						<span className="layer1__stat__title">C. Supply</span>
					</div>
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">{maxSupply}</span>
							<span className="layer1__stat__unit">{maxSupplyUnit}</span>
						</div>
						<span className="layer1__stat__title">Max Supply</span>
					</div>
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">{profile.inflation}</span>
							<span className="layer1__stat__unit">%</span>
						</div>
						<span className="layer1__stat__title">Inflation</span>
					</div>
				</div>

				<div className="layer1__stats__footer">
					<span className="layer1__stats__footer__title">Decentralization Score</span>
					<div className={`layer1__stat__filler score--${profile.dScore}`}>
						<span className="layer1__stat__filler__score">
							{/* <span className="layer1__stat__number">{profile.dScore} / 10</span> */}
							<span className="layer1__stat__number"></span>
						</span>
					</div>
				</div>
			</div>

			<div className={`layer1__box layer1__logo ${ticker}`}>
				{getIcon(ticker, 'layer1__logo__img icon--white')}
				<div className="layer1__logo__btnContainer">
					<LinkButton to={`/l1s/${ticker}`} type="primary-invert">
						Learn more
					</LinkButton>
				</div>
			</div>
		</aside>
	);
};

export default L1SummaryCard;
