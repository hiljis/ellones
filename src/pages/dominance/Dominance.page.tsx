import { FormEventHandler, useEffect, useState } from 'react';
import {
	DAYS_1M_BACK,
	DAYS_3M_BACK,
	DAYS_6M_BACK,
	DAYS_1Y_BACK,
	DAYS_2Y_BACK,
	DAYS_3Y_BACK,
	DAYS_SINCE_BTC_MARKET_DATA_START,
	DAYS_4Y_BACK,
	DAYS_5Y_BACK,
} from '../../app/utils/consts';
import BarChart from '../../components/charts/barChart/BarChart';
import DoughnutChart from '../../components/charts/doughnutChart/DoughnutChart';
import CheckboxIcon from '../../components/checkboxIcon/CheckboxIcon';
import CheckGroup from '../../components/checkGroup/CheckGroup';
import Loader from '../../components/loader/loader';
import PageHeader from '../../components/pageHeader/PageHeader';
import {
	changeDataCategory,
	DominanceDataCategory,
	selectDataCategory,
	selectIncludedTickers,
} from '../../store/dominance/dominance.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectMarketDataByIndex, selectMarketDataStatus } from '../../store/marketData/marketDataSlice';
import { selectTickers } from '../../store/profiles/profilesSlice';
import './Dominance.page.scss';

const DominancePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const dataCategory = useAppSelector(selectDataCategory);
	const marketDataStatus = useAppSelector(selectMarketDataStatus);
	const [index, setIndex] = useState(0);
	const marketData = useAppSelector((state) => selectMarketDataByIndex(state, dataCategory, index));
	const includedTickers = useAppSelector(selectIncludedTickers);
	const tickers = useAppSelector(selectTickers);
	const [excluded, setExcluded] = useState<string[]>([]);

	if (marketDataStatus !== 'loadComplete' || !marketData) {
		return (
			<main className="dominancePage">
				<PageHeader>Dominance</PageHeader>
				<section className="section__dominanceCharts loading">
					<Loader color="black" size="md" />
				</section>
			</main>
		);
	}

	const filteredMarketData = marketData.map((element) => {
		if (excluded.includes(element.ticker)) return { ticker: element.ticker, data: { ...element.data, y: 0 } };
		return element;
	});

	const total = filteredMarketData.reduce((acc, prev) => {
		if (typeof prev.data!.y !== 'number') return acc;
		return acc + prev.data!.y;
	}, 0);

	const handleOnTickerCheck = (checkedTicker: string, isChecked: boolean) => {
		if (excluded.includes(checkedTicker)) {
			setExcluded(excluded.filter((ticker) => ticker !== checkedTicker));
		} else {
			setExcluded([...excluded, checkedTicker]);
		}
	};

	const handleOnDataCategoryChange = (selectedDataCategory: DominanceDataCategory) => {
		dispatch(changeDataCategory(selectedDataCategory));
	};

	const handleOnTimeChange = (selectedTime: string) => {
		const value = parseInt(selectedTime);
		setIndex(value);
		console.log(selectedTime);
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
					<CheckGroup initSelected={DAYS_1M_BACK} widthSize="sm" selectHandler={handleOnTimeChange}>
						{[
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
					{tickers.map((ticker) => (
						<CheckboxIcon ticker={ticker} checkHandler={handleOnTickerCheck} />
					))}
				</form>
			</section>
		</main>
	);
};

export default DominancePage;
