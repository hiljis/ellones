import L1Card from '../../components/l1Card/L1Card';
import './L1sGrid.section.scss';

const tickers = [
	'btc',
	'eth',
	'bnb',
	'ada',
	'sol',
	'avax',
	'ftm',
	'flow',
	'xlm',
	'rune',
	'eos',
	'dot',
	'matic',
	'trx',
	'near',
	'algo',
	'icp',
	'hbar',
	'qnt',
	'xtz',
	'egld',
];

const L1sGrid: React.FC = () => {
	return (
		<section className="section__layer1s">
			<h4 className="section__header section__header--layer1sGrid">Layer 1 protocols</h4>
			<div className="section__layer1sGrid">
				{tickers.map((ticker, i) => (
					<L1Card ticker={ticker} key={i} />
				))}
			</div>
		</section>
	);
};

export default L1sGrid;
