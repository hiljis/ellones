import L1sGrid from '../../sections/layer1sGrid/L1sGrid.section';
import L1sWhat from '../../sections/layer1sWhat/L1sWhat.section';
import './L1s.page.scss';

const L1sPage: React.FC = () => {
	return (
		<main className="layer1sGridPage">
			<L1sGrid />
			<L1sWhat />
		</main>
	);
};

export default L1sPage;
