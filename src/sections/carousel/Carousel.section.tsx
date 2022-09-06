import './Carousel.section.scss';
import TickerCarousel from '../../components/tickerCarousel/TickerCarousel';

const tickers = ['btc', 'eth', 'bnb', 'ada', 'sol', 'avax', 'ftm', 'flow', 'xlm', 'rune', 'eos', 'dot', 'matic', 'trx'];

type Props = {
	visibleCards: number;
};

const Carousel: React.FC<Props> = ({ visibleCards }) => {
	return (
		<section className="section__carousel">
			<TickerCarousel numVisibleCards={visibleCards} tickers={tickers} />
		</section>
	);
};

export default Carousel;
