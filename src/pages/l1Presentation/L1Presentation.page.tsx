import { tickers } from '../../app/utils/tickers';
import HeroPresentation from '../../sections/heroPresentation/HeroPresentation.section';

import './L1Presentation.page.scss';

const L1PresentationPage: React.FC = () => {
	const l1Name = 'bitcoin';
	return (
		<main className="l1PresentationPage">
			<HeroPresentation l1Name={l1Name} ticker={tickers[l1Name]} />
		</main>
	);
};

export default L1PresentationPage;
