import { useEffect, useState } from 'react';
import {
	DAYS_1M_BACK,
	DAYS_3M_BACK,
	DAYS_6M_BACK,
	DAYS_1Y_BACK,
	DAYS_2Y_BACK,
	DAYS_3Y_BACK,
	DAYS_4Y_BACK,
	DAYS_5Y_BACK,
} from '../../app/utils/consts';
import BarChart from '../../components/charts/barChart/BarChart';
import DoughnutChart from '../../components/charts/doughnutChart/DoughnutChart';
import CheckGroup from '../../components/checkGroup/CheckGroup';
import PageHeader from '../../components/pageHeader/PageHeader';
import {
	changeDataCategory,
	DominanceDataCategory,
	selectDataCategory,
	selectDominanceExcludedTickers,
	selectDominanceTickers,
} from '../../store/dominance/dominance.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMarketDataByIndex } from '../../store/marketData/marketDataSlice';
import './Dominance.page.scss';
import DominanceCheckboxIcon from './dominanceCheckboxIcon/DominanceCheckboxIcon';

const DominancePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const dataCategory = useAppSelector(selectDataCategory);
	const [index, setIndex] = useState(0);
	const marketData = useAppSelector((state) => selectMarketDataByIndex(state, dataCategory, index));
	const excludedTickers = useAppSelector(selectDominanceExcludedTickers);
	const tickers = useAppSelector(selectDominanceTickers);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const filteredMarketData = marketData.map((element) => {
		if (excludedTickers.includes(element.ticker))
			return { ticker: element.ticker, data: { ...element.data, y: 0 } };
		return element;
	});

	const handleOnDataCategoryChange = (selectedDataCategory: DominanceDataCategory) => {
		dispatch(changeDataCategory(selectedDataCategory));
	};

	const handleOnTimeChange = (selectedTime: string) => {
		const value = parseInt(selectedTime);
		setIndex(value);
	};

	return (
		<main className="dominancePage">
			<PageHeader>Dominance</PageHeader>
			<section className="section__dominanceCharts">
				<div className="dataFilterOptions">
					<CheckGroup initSelected={'mCap'} widthSize="md" selectHandler={handleOnDataCategoryChange}>
						{[
							{ string: 'Market Cap', value: 'mCap' },
							{ string: 'Volume', value: 'volume' },
						]}
					</CheckGroup>
					<CheckGroup initSelected={0} widthSize="sm" selectHandler={handleOnTimeChange}>
						{[
							{ string: 'now', value: 0 },
							{ string: '1m', value: DAYS_1M_BACK },
							{ string: '3m', value: DAYS_3M_BACK },
							{ string: '6m', value: DAYS_6M_BACK },
							{ string: '1y', value: DAYS_1Y_BACK },
							{ string: '2y', value: DAYS_2Y_BACK },
							{ string: '3y', value: DAYS_3Y_BACK },
							{ string: '4y', value: DAYS_4Y_BACK },
							{ string: '5y', value: DAYS_5Y_BACK },
						]}
					</CheckGroup>
				</div>
				<BarChart tickerData={filteredMarketData} dataCategory={dataCategory} />
				<DoughnutChart tickerData={filteredMarketData} dataCategory={dataCategory} />
				<form className="section__dominanceCharts__iconToggleRow">
					{tickers.map((ticker, i) => (
						<DominanceCheckboxIcon ticker={ticker} key={i} />
						// <CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} key={i} />
					))}
				</form>
			</section>
		</main>
	);
};

export default DominancePage;
