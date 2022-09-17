import { ReactComponent as IllustrationCharts } from './icons/illustration__charts.svg';
import { ReactComponent as IconLogoInvert } from '../../assets/svg/ellones_logo-black--50.svg';
import './FeatureCard.scss';
import IllustrationMarket from '../illustrations/illustrationMarket/IllustrationMarket';
import IllustrationNetwork from '../illustrations/illustrationNetwork/IllustrationNetwork';
import IllustrationNewsTrends from '../illustrations/illustrationNewsTrends/IllustrationNewsTrends';

type FeatureProps = {
	header: string;
	disabled?: boolean;
};

const Feature = (props: FeatureProps) => {
	const handleToggleDisabled = (e: any) => {
		e.target.classList.toggle('show');
	};

	if (props.disabled) {
		return (
			<div className="feature disabled" onClick={handleToggleDisabled}>
				<h3 className="feature__header">{props.header}</h3>
			</div>
		);
	}

	if (props.header === 'ellones') {
		return (
			<a className="feature" href="#">
				<IconLogoInvert className="feature__ellones" />
				<h3 className="feature__header--logo">{props.header}</h3>
			</a>
		);
	}

	let illustration;
	if (props.header === 'charts') illustration = <IllustrationCharts />;
	if (props.header === 'market') illustration = <IllustrationMarket />;
	if (props.header === 'network') illustration = <IllustrationNetwork />;
	if (props.header === 'news & trends') illustration = <IllustrationNewsTrends />;

	return (
		<a className="feature" href="#">
			<h3 className="feature__header">{props.header}</h3>
			<div className="feature__illustration">{illustration}</div>
		</a>
	);
};

export default Feature;
