import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectProfiles } from '../../store/profiles/profilesSlice';
import L1Card from '../l1Card/L1Card';
import { ReactComponent as IconArrowLeft } from './icons/ArrowL.svg';
import { ReactComponent as IconArrowRight } from './icons/ArrowR.svg';
import './TickerCarousel.scss';

const TickerCarousel: React.FC = () => {
	const profiles = useAppSelector(selectProfiles);

	if (!profiles) {
		return (
			<div className="carousel__container">
				<div>LOADER</div>
			</div>
		);
	}

	return (
		<div className="carousel__container">
			<div className="cards">
				{profiles.map((profile, i) => {
					return <L1Card ticker={profile.ticker} key={i} link={false} />;
				})}
			</div>
		</div>
	);
};

export default TickerCarousel;
