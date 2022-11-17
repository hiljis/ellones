import Feature from '../../components/featureCard/FeatureCard';
import './Features.section.scss';

const Features = () => {
	return (
		<section className="section__features">
			<h4 className="section__header">Features</h4>
			<div className="featuresGrid">
				<Feature header="ellones" />
				<Feature header="charts" url="/charts" />
				<Feature header="market" url="/change" />
				<Feature header="network" disabled={true} />
				<Feature header="news & trends" disabled={true} />
				<Feature header="learn & share" disabled={true} />
			</div>
		</section>
	);
};

export default Features;
