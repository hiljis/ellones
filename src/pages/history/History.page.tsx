import { useEffect } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import './History.page.scss';
import HistoryMatrix from './historyMatrix/HistoryMatrix';

const HistoryPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="historyPage">
			<PageHeader showLoad={false}>History by month</PageHeader>
			<HistoryMatrix />
		</main>
	);
};

export default HistoryPage;
