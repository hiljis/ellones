import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeroPresentation from '../../sections/heroPresentation/HeroPresentation.section';

import './L1Presentation.page.scss';

const L1PresentationPage: React.FC = () => {
	const { ticker } = useParams() as { ticker: string };

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [ticker]);

	return (
		<main className="l1PresentationPage">
			<HeroPresentation ticker={ticker} />
		</main>
	);
};

export default L1PresentationPage;
