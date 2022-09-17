import './Carousel.section.scss';
import TickerCarousel from '../../components/tickerCarousel/TickerCarousel';

type Props = {
	visibleCards: number;
};

const Carousel: React.FC<Props> = ({ visibleCards }) => {
	return (
		<section className="section__carousel" id="sectionCarousel">
			<h4 className="section__header">Layer 1 protocols</h4>
			<TickerCarousel numVisibleCards={visibleCards} />
		</section>
	);
};

export default Carousel;
