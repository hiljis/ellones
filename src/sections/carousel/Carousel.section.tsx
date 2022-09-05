import { ReactComponent as IconArrowLeft } from './icons/ArrowL.svg';
import { ReactComponent as IconArrowRight } from './icons/ArrowR.svg';

import './Carousel.section.scss';
import L1Card from '../../components/l1Card/L1Card';
import { useRef } from 'react';

const Carousel = () => {
	const cardsRef = useRef(null);

	const handleClickLeft = () => {
		if (!cardsRef) return;
	};

	const handleClickRight = () => {
		if (!cardsRef) return;
	};

	return (
		<section className="section__carousel">
			<div className="carousel--interactive">
				<button
					className="carousel__btn carousel__btn--left"
					onClick={handleClickLeft}
					type="button"
					title="Button - Left"
				>
					<IconArrowLeft className="carousel__btnIcon carousel__btnIcon--left" />
				</button>
				<div className="carousel__content">
					<div className="carousel__cards" ref={cardsRef}>
						<L1Card ticker="btc" />
						<L1Card ticker="eth" />
						<L1Card ticker="bnb" />
						<L1Card ticker="ada" />
						<L1Card ticker="sol" />
						<L1Card ticker="avax" />
						<L1Card ticker="ftm" />
						<L1Card ticker="flow" />
						<L1Card ticker="xlm" />
						<L1Card ticker="rune" />
						<L1Card ticker="eos" />
					</div>
				</div>
				<button
					className="carousel__btn carousel__btn--right"
					onClick={handleClickRight}
					type="button"
					title="Button - Right"
				>
					<IconArrowRight className="carousel__btnIcon carousel__btnIcon--right" />
				</button>
			</div>

			<div className="carouselIndicator--position">
				<div className="position"></div>
			</div>
		</section>
	);
};

export default Carousel;
