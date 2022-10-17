import { ReactComponent as IconLogoInvert } from '../../assets/svg/ellones_logo-black--50.svg';
import PageHeader from '../../components/pageHeader/PageHeader';
import PageContainer from '../../components/UI/PageContainer';
import './About.page.scss';

const words = [
	'digital',
	'web3',
	'layer1s',
	'crypto',
	'ellones',
	'bitcoin',
	'solana',
	'network',
	'users',
	'wallets',
	'data',
	'charts',
	'pairs',
	'%',
	'TPS',
	'supply',
	'DAUs',
	'blocks',
	'chain',
	'ethereum',
	'avalanche',
	'tron',
	'decentralization',
	'exponential',
	'transactions',
	'volume',
	'binance',
];
const AboutPage: React.FC = () => {
	return (
		<PageContainer>
			<PageHeader showLoad={false}>About</PageHeader>
			<IconLogoInvert className="aboutLogo" />
			<section className="aboutPage__sectionText">
				<h2 className="aboutPage__header">ellones</h2>
				<p className="aboutPage__paragraph">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste architecto totam aperiam adipisci sed
					possimus assumenda, quaerat eum dolorum blanditiis, rerum optio. Rem, sit exercitationem.
					Accusantium nemo dignissimos quo dolores. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Iste architecto totam aperiam adipisci sed possimus assumenda, quaerat eum dolorum blanditiis, rerum
					optio. Rem, sit exercitationem. Accusantium nemo dignissimos quo dolores.
				</p>
			</section>
			<section className="aboutPage__sectionStats">
				<div className="aboutStat aboutStat--1">
					<h5 className="aboutStat--title">Title 1</h5>
					<span className="aboutStat--number">11%</span>
				</div>
				<div className="aboutStat aboutStat--2">
					<h5 className="aboutStat--title">Title 1</h5>
					<span className="aboutStat--number">11%</span>
				</div>
				<div className="aboutStat aboutStat--3">
					<h5 className="aboutStat--title">Title 1</h5>
					<span className="aboutStat--number">11%</span>
				</div>
			</section>
			<section className="aboutPage__sectionText">
				<h2 className="aboutPage__header aboutPage__header--right">Header</h2>
				<p className="aboutPage__paragraph">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste architecto totam aperiam adipisci sed
					possimus assumenda, quaerat eum dolorum blanditiis, rerum optio. Rem, sit exercitationem.
					Accusantium nemo dignissimos quo dolores, possimus assumenda, quaerat eum dolorum blanditiis, rerum
					optio. Rem, sit exercitationem. Accusantium nemo dignissimos quo dolores.
				</p>
			</section>
			<section className="aboutPage__sectionWords">
				<div className="aboutPage__sectionWords--overlay" />
				{words.map((word, i) => {
					const number = i % 6;
					return <span className={`word word--${number.toString()}`}>{word}</span>;
				})}
				{words.map((word, i) => {
					const number = i % 8;
					return <span className={`word word--${number.toString()}`}>{word}</span>;
				})}
				{words.map((word, i) => {
					const number = i % 7;
					return <span className={`word word--${number.toString()}`}>{word}</span>;
				})}
			</section>
		</PageContainer>
	);
};

export default AboutPage;
