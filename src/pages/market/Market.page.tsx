import { useEffect } from 'react';
import MarketList from '../../sections/marketList/MarketList.section';
import './Market.page.scss';

const MarketPage: React.FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="marketPage">
			<MarketList />
		</main>
	);
};

export default MarketPage;
