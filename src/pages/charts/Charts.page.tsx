import { useEffect } from 'react';
import ChartCard from './chartCard/ChartCard';
import PageHeader from '../../components/pageHeader/PageHeader';
import PageContainer from '../../components/UI/PageContainer';
import { selectCharts } from '../../store/charts/charts.slice';
import { useAppSelector } from '../../store/hooks';
import { selectTickers } from '../../store/profiles/profilesSlice';
import './Charts.page.scss';
import ChartAdderBtn from './chartAdderBtn/ChartAdderBtn';

const ChartsPage: React.FC = () => {
	const tickers = useAppSelector(selectTickers);
	const charts = useAppSelector(selectCharts);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let content;
	if (charts.length === 0) {
		content = <p className="message__empty">(No charts to display)</p>;
	} else {
		content = charts.map((_, i) => <ChartCard index={i} key={i} />);
	}

	return (
		<PageContainer>
			<PageHeader>Charts</PageHeader>
			{content}
			<ChartAdderBtn />
		</PageContainer>
	);
};

export default ChartsPage;
