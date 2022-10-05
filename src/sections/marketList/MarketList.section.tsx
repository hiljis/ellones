import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import {
	ActiveData,
	MarketListRowModel,
	selectMarketListActiveData,
	selectMarketListData,
	selectMarketListSortAsc,
	selectMarketListSortTarget,
	SortTarget,
} from '../../store/marketList/marketListSlice';
import './MarketList.section.scss';
import MarketListRow from './marketListRow/MarketListRow';
import BtnColSort from './btnColSort/BtnColSort';
import BtnDataSelect from './btnDataSelect/BtnDataSelector';
import MarketListRange from './marketListRange/MarketListRange';

const sort = (data: MarketListRowModel[], activeData: ActiveData, sortBy: SortTarget, asc: boolean) => {
	if (asc) {
		if (sortBy === 'ticker') {
			return data.sort((a, b) => b.ticker[0].localeCompare(a.ticker[0]));
			// return data.sort((a, b) => parseInt(b.ticker[0]) - parseInt(a.ticker[0]));
		} else if (sortBy === 'currentMCap') {
			return data.sort((a, b) => b.currentMCap - a.currentMCap);
		} else if (sortBy === 'currentPrice') {
			return data.sort((a, b) => b.currentPrice - a.currentPrice);
		} else {
			return data.sort((a, b) => b[activeData][sortBy] - a[activeData][sortBy]);
		}
	} else {
		if (sortBy === 'ticker') {
			return data.sort((a, b) => a.ticker[0].localeCompare(b.ticker[0]));
		} else if (sortBy === 'currentMCap') {
			return data.sort((a, b) => a.currentMCap - b.currentMCap);
		} else if (sortBy === 'currentPrice') {
			return data.sort((a, b) => a.currentPrice - b.currentPrice);
		} else {
			return data.sort((a, b) => a[activeData][sortBy] - b[activeData][sortBy]);
		}
	}
};

const MarketList: React.FC = () => {
	// TABLE SELECTORS
	const activeData = useAppSelector(selectMarketListActiveData);
	const sortedBy = useAppSelector(selectMarketListSortTarget);
	const sortAsc = useAppSelector(selectMarketListSortAsc);

	const marketListData = useAppSelector(selectMarketListData);
	const [sortedList, setSortedList] = useState<MarketListRowModel[]>([]);

	useEffect(() => {
		setSortedList(sort([...marketListData], activeData, sortedBy, sortAsc));
	}, [sortedBy, sortAsc, activeData, marketListData]);

	let rows = sortedList?.map((data, i) => {
		return <MarketListRow data={data} activeData={activeData} key={i} />;
	});

	return (
		<section className="section__marketList">
			<div className="marketList">
				<div className="marketList__header">
					<div className="marketList__targetGroup marketList__targetGroup--btns">
						<BtnDataSelect dataTarget="price">PRICE</BtnDataSelect>
						<BtnDataSelect dataTarget="mCap">MARKET CAP</BtnDataSelect>
						<BtnDataSelect dataTarget="volume">VOLUME</BtnDataSelect>
					</div>
					<div className="marketList__targetGroup marketList__targetGroup--range">
						<MarketListRange />
					</div>
					<BtnColSort className="col--ticker" sortTarget="ticker">
						TICKER
					</BtnColSort>
					<BtnColSort className="col--price" sortTarget="currentPrice">
						PRICE
					</BtnColSort>
					<BtnColSort className="col--24h" sortTarget="24h">
						24H
					</BtnColSort>
					<BtnColSort className="col--1w" sortTarget="1w">
						1W
					</BtnColSort>
					<BtnColSort className="col--1m" sortTarget="1m">
						1M
					</BtnColSort>
					<BtnColSort className="col--3m" sortTarget="3m">
						3M
					</BtnColSort>
					<BtnColSort className="col--6m" sortTarget="6m">
						6M
					</BtnColSort>
					<BtnColSort className="col--1y" sortTarget="1y">
						1Y
					</BtnColSort>
					<BtnColSort className="col--3y" sortTarget="3y">
						3Y
					</BtnColSort>
					<BtnColSort className="col--range" sortTarget="range">
						R
					</BtnColSort>
					<BtnColSort className="col--mCap" sortTarget="currentMCap">
						MARKET CAP
					</BtnColSort>
				</div>
				<ul className="marketList__list">{rows}</ul>
			</div>
		</section>
	);
};

export default MarketList;
