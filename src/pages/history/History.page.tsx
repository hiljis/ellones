import { useEffect } from 'react';
import './History.page.scss';
import HistoryMatrix from './historyMatrix/HistoryMatrix';

const HistoryPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="historyPage">
			<div className="pageHeader">
				<h3 className="pageHeader--text">History by month</h3>
			</div>
			<HistoryMatrix />
		</main>
	);
};

export default HistoryPage;
