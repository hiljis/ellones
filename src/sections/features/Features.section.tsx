import Feature from '../../components/feature/Feature';
import './Features.section.scss';

const Features = () => {
	return (
		<section className="section__features">
			<Feature header="ellones" />
			<Feature header="charts" />
			<Feature header="market" />
			<Feature header="network" />
			<Feature header="news & trends" disabled={true} />
			<Feature header="learn & share" disabled={true} />
		</section>
	);
};

export default Features;
