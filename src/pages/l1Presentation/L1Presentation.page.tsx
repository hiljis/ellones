import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeroPresentation from '../../sections/heroPresentation/HeroPresentation.section';
import { useAppDispatch } from '../../store/hooks';
import { setLocalTheme } from '../../store/theme/theme.slice';

import './L1Presentation.page.scss';

const L1PresentationPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { ticker } = useParams() as { ticker: string };

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setLocalTheme(ticker));

		return () => {
			dispatch(setLocalTheme(''));
		};
	}, [ticker]);

	return (
		<main className="l1PresentationPage">
			<HeroPresentation ticker={ticker} />
		</main>
	);
};

export default L1PresentationPage;
