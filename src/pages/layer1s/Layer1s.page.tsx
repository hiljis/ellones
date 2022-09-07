import Layer1sGrid from '../../sections/layer1sGrid/Layer1sGrid.section';
import Layer1sWhat from '../../sections/layer1sWhat/Layer1sWhat.section';
import './Layer1s.page.scss';

const Layer1sPage: React.FC = () => {
	return (
		<main className="layer1sGridPage">
			<Layer1sGrid />
			<Layer1sWhat />
		</main>
	);
};

export default Layer1sPage;
