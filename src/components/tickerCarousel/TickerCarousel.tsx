import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import L1Card from '../l1Card/L1Card';
import { ReactComponent as IconArrowLeft } from './icons/ArrowL.svg';
import { ReactComponent as IconArrowRight } from './icons/ArrowR.svg';
import './TickerCarousel.scss';

type Props = {
	tickers: string[];
	numVisibleCards: number;
};

const TickerCarousel: React.FC<Props> = ({ tickers, numVisibleCards }) => {
	const numCards = tickers.length;
	const hiddenCards = numCards - numVisibleCards;
	const [hiddenLeft, sethiddenLeft] = useState(0);
	const [cardWidth, setCardWidth] = useState(0);
	const [positionIndicatorWidth, setPositionIndicatorWidth] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (contentRef.current !== null) {
			setCardWidth(contentRef.current.offsetWidth / numVisibleCards);
		}
	}, [numVisibleCards]);

	useEffect(() => {
		setPositionIndicatorWidth((numVisibleCards * cardWidth) / (hiddenCards + 1));
	}, [cardWidth, numVisibleCards, hiddenCards]);

	const handleClickLeft = () => {
		if (hiddenLeft <= 0) return;
		sethiddenLeft((prev) => prev - 1);
	};

	const handleClickRight = () => {
		if (hiddenLeft >= hiddenCards) return;
		sethiddenLeft((prev) => prev + 1);
	};

	return (
		<div className="carousel__container">
			<div className="carousel">
				<button
					className="carousel__btn carousel__btn--left"
					onClick={handleClickLeft}
					type="button"
					title="Button - Left"
				>
					<IconArrowLeft className="carousel__btnIcon carousel__btnIcon--left" />
				</button>
				<div className="carousel__content" ref={contentRef}>
					<div className="carousel__cards" style={{ left: -hiddenLeft * cardWidth }}>
						{tickers.map((ticker, i) => {
							return <L1Card ticker={ticker} key={i} width={cardWidth} />;
						})}
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
				<div
					className="position"
					style={{
						width: positionIndicatorWidth,
						left: positionIndicatorWidth * hiddenLeft,
					}}
				></div>
			</div>
		</div>
	);
};

export default TickerCarousel;
