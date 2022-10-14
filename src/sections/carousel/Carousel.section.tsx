import './Carousel.section.scss';
import TickerCarousel from '../../components/tickerCarousel/TickerCarousel';

const Carousel: React.FC = () => {
	return (
		<section className="section__carousel" id="sectionCarousel">
			<h4 className="section__header">Layer 1 protocols</h4>
			<TickerCarousel />
		</section>
	);
};

export default Carousel;
