// import { ReactComponent as IllustrationCharts } from './icons/illustration__charts.svg';
import { ReactComponent as IconLogoInvert } from '../../assets/svg/ellones_logo-black--50.svg';
import './FeatureCard.scss';
import IllustrationCharts from '../illustrations/illustrationCharts/IllustrationCharts';
import IllustrationMarket from '../illustrations/illustrationMarket/IllustrationMarket';
import IllustrationNetwork from '../illustrations/illustrationNetwork/IllustrationNetwork';
import IllustrationNewsTrends from '../illustrations/illustrationNewsTrends/IllustrationNewsTrends';
import { NavLink } from 'react-router-dom';
import React from 'react';

type Props = {
	header: string;
	disabled?: boolean;
	url?: string;
};

const Feature: React.FC<Props> = ({ header, disabled, url }) => {
	const handleToggleDisabled = (e: any) => {
		e.target.classList.toggle('show');
	};

	if (disabled) {
		return (
			<div className="feature disabled" onClick={handleToggleDisabled}>
				<h3 className="feature__header">{header}</h3>
			</div>
		);
	}

	if (header === 'ellones') {
		return (
			<NavLink className="feature" to="/about">
				<IconLogoInvert className="feature__ellones" />
				<h3 className="feature__header--logo">{header}</h3>
			</NavLink>
		);
	}

	let illustration;
	if (header === 'charts') illustration = <IllustrationCharts />;
	if (header === 'market') illustration = <IllustrationMarket />;
	if (header === 'network') illustration = <IllustrationNetwork />;
	if (header === 'news & trends') illustration = <IllustrationNewsTrends />;

	return (
		<NavLink className="feature" to={`${url ? url : '#'}`}>
			<h3 className="feature__header">{header}</h3>
			<div className="feature__illustration">{illustration}</div>
		</NavLink>
	);
};

export default Feature;
