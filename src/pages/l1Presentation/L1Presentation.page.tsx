import { useParams } from 'react-router-dom';
import { tickers } from '../../app/utils/tickers';
import HeroPresentation from '../../sections/heroPresentation/HeroPresentation.section';

import './L1Presentation.page.scss';

const L1PresentationPage: React.FC = () => {
	let { l1Name } = useParams();
	if (!l1Name) {
		return <div></div>;
	}

	return (
		<main className="l1PresentationPage">
			<HeroPresentation l1Name={l1Name} ticker={tickers[l1Name]} />
		</main>
	);
};

export default L1PresentationPage;
