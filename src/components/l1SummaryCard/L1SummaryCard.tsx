import { getIcon } from '../icons/Icons';
import LinkButton from '../linkButton/LinkButton';
import LinkSocial from '../linkSocial/LinkSocial';
import LinkText from '../linkText/LinkText';
import './L1SummaryCard.scss';

type Props = {
	ticker: string;
};

const L1SummaryCard: React.FC<Props> = ({ ticker }) => {
	console.log(ticker);
	return (
		<aside className="layer1SummaryCard" id="bitcoin">
			<div className="layer1__box layer1__info">
				<div className="layer1__info__header">
					<h4>Bitcoin</h4>
					<div className="tags">
						<span className="tag">2009</span>
						<span className="tag">POW</span>
					</div>
				</div>
				<p className="layer1__info--description">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, iure. At, nihil animi. Quae
					temporibus non labore. Ipsa velit hic veniam possimus cupiditate iusto numquam ad ipsam dicta
					provident. Voluptatem.
				</p>
				<div className="layer1__info__links">
					<LinkText href="#" type="resource">
						bitcoin.org
					</LinkText>
					<div className="layer1__info__socials">
						<LinkSocial plattform="facebook" href="#" withText={false} />
						<LinkSocial plattform="github" href="#" withText={false} />
						<LinkSocial plattform="twitter" href="#" withText={false} />
					</div>
				</div>
			</div>

			<div className="layer1__box layer1__stats">
				<div className="layer1__stats__grid">
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">1</span>
							<span className="layer1__stat__unit"></span>
						</div>
						<span className="layer1__stat__title">Mcap Rank</span>
					</div>
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">10</span>
							<span className="layer1__stat__unit">TPM</span>
						</div>
						<span className="layer1__stat__title">Speed</span>
					</div>
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">100</span>
							<span className="layer1__stat__unit">K</span>
						</div>
						<span className="layer1__stat__title">Validators</span>
					</div>
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">21</span>
							<span className="layer1__stat__unit">M</span>
						</div>
						<span className="layer1__stat__title">Max Supply</span>
					</div>
					<div className="layer1__statBox">
						<div className="layer1__stat">
							<span className="layer1__stat__number">2</span>
							<span className="layer1__stat__unit">%</span>
						</div>
						<span className="layer1__stat__title">Inflation</span>
					</div>
				</div>

				<div className="layer1__stats__footer">
					<span className="layer1__stats__footer__title">Decentralization Score</span>
					<div className="layer1__stat__filler score--9">
						<span className="layer1__stat__filler__score">
							<span className="layer1__stat__number">9 / 10</span>
						</span>
					</div>
				</div>
			</div>

			<div className="layer1__box layer1__logo">
				{getIcon(ticker, 'layer1__logo__img icon--white')}
				<LinkButton text="Learn more" href={`#${ticker}`} style="invert" />
			</div>
		</aside>
	);
};

export default L1SummaryCard;
