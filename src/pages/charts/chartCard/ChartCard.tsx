import React, { useEffect, useState } from 'react';
import {
	DAYS_1M_BACK,
	DAYS_1Y_BACK,
	DAYS_2Y_BACK,
	DAYS_3M_BACK,
	DAYS_3Y_BACK,
	DAYS_4Y_BACK,
	DAYS_5Y_BACK,
	DAYS_6M_BACK,
} from '../../../app/utils/consts';
import { MarketDataPoint } from '../../../app/utils/types';
import { getChartCardBorderColor } from '../../../components/charts/chartUtils/colors';
import CheckGroup from '../../../components/checkGroup/CheckGroup';
import Loader from '../../../components/loader/loader';
import {
	changeChartDataCategory,
	changeChartResolution,
	changeChartScale,
	changeChartTimeSpan,
	changeDisplayMode,
	ChartDataCategory,
	deleteChart,
	DisplayMode,
	selectChartData,
	selectChartDataCategory,
	selectChartDisplayMode,
	selectChartResolution,
	selectChartScale,
	selectChartTicker,
	selectChartTimeSpan,
} from '../../../store/charts/charts.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchTickerStart, selectMarketDataStatusByTicker } from '../../../store/marketData/marketDataSlice';
import ChartCardChart from '../chartCardChart/ChartCardChart';
import SelectTickerBtn from '../selectTickerBtn/SelectTickerBtn';
import { ReactComponent as IconSettings } from '../../../assets/svg/icon_settings.svg';
import { ReactComponent as IconClose } from '../../../assets/svg/icon_close.svg';
import './ChartCard.scss';

type Props = {
	children?: React.ReactNode[];
	deleteHandler?: Function;
	index: number;
};

const ChartCard: React.FC<Props> = ({ children, deleteHandler, index }) => {
	const dispatch = useAppDispatch();
	const chartData = useAppSelector((state) => selectChartData(state, index));
	const chartDataCategory = useAppSelector((state) => selectChartDataCategory(state, index));
	const chartTimeSpan = useAppSelector((state) => selectChartTimeSpan(state, index));
	const chartScale = useAppSelector((state) => selectChartScale(state, index));
	const chartResolution = useAppSelector((state) => selectChartResolution(state, index));
	const selectedTicker = useAppSelector((state) => selectChartTicker(state, index));
	const chartDisplayMode = useAppSelector((state) => selectChartDisplayMode(state, index));
	const loadStatus = useAppSelector((state) => selectMarketDataStatusByTicker(state, selectedTicker));
	const [trimmedChartData, setTrimmedChartData] = useState<MarketDataPoint[]>([]);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	useEffect(() => {
		if (loadStatus === 'idle' || loadStatus === 'load-failed') dispatch(fetchTickerStart(selectedTicker));
	}, [selectedTicker]);

	useEffect(() => {
		if (chartData && chartData.length > 0) {
			setTrimmedChartData(chartData.slice(chartData.length - chartTimeSpan));
		}
	}, [chartTimeSpan, chartDataCategory, chartData]);

	const handleDeleteChart = () => {
		dispatch(deleteChart(index));
	};

	const handleOnDisplayModeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
		const newMode = e.currentTarget.getAttribute('data-mode') as DisplayMode;
		dispatch(changeDisplayMode({ index: index, mode: newMode }));
	};

	const handleOnDataCategoryChange = (dataCategory: ChartDataCategory) => {
		dispatch(changeChartDataCategory({ index: index, dataCategory: dataCategory }));
	};

	const handleOnTimeSpanChange = (timeSpan: number) => {
		dispatch(changeChartTimeSpan({ index: index, timeSpan: timeSpan }));
	};

	const handleOnResolutionChange = (resolution: number) => {
		dispatch(changeChartResolution({ index: index, resolution: resolution }));
	};

	const handleOnScaleChange = (scale: string) => {
		dispatch(changeChartScale({ index: index, scale: scale }));
	};

	const handleToggleOverlay = () => {
		setIsOverlayOpen(!isOverlayOpen);
	};

	let content;
	if (!selectedTicker) {
		content = <p className="chartCard__message">(Choose a chain)</p>;
	} else if (loadStatus === 'loading' || loadStatus === 'load-waiting') {
		content = <p className="chartCard__message">Loading data...</p>;
	} else if (loadStatus === 'load-failed') {
		content = <p className="chartCard__message">{`Failed to load data for ${selectedTicker}`}</p>;
	} else if (trimmedChartData.length === 0) {
		content = <Loader color="black" size="md" />;
	} else if (trimmedChartData.length > 0) {
		console.log(chartData);
		console.log(trimmedChartData);
		content = (
			<ChartCardChart
				data={trimmedChartData}
				dataCategory={chartDataCategory}
				resolution={chartResolution}
				scale={chartScale}
				borderColor={getChartCardBorderColor(selectedTicker)}
				displayMode={chartDisplayMode}
			/>
		);
	}

	return (
		<article className={`chartCard ${chartDisplayMode}`}>
			<SelectTickerBtn ticker={selectedTicker} loadStatus={loadStatus} index={index} />
			<div className="chartCard__checkGroup chartCard__checkGroup--dataCategory">
				<CheckGroup
					initSelected={chartDataCategory}
					widthSize="md"
					selectHandler={handleOnDataCategoryChange}
					disabled={chartData.length <= 0}
					title="data category"
				>
					{[
						{ string: 'Market Cap', value: 'mCap' },
						{ string: 'Volume', value: 'volume' },
						{ string: 'Price', value: 'price' },
					]}
				</CheckGroup>
			</div>

			<div className="chartCard__checkGroup chartCard__checkGroup--timeSpan">
				<CheckGroup
					initSelected={chartTimeSpan}
					widthSize="sm"
					selectHandler={handleOnTimeSpanChange}
					disabled={chartData.length <= 0}
					title="time span"
				>
					{[
						{ string: '1m', value: DAYS_1M_BACK <= chartData.length ? DAYS_1M_BACK : -1 },
						{ string: '3m', value: DAYS_3M_BACK <= chartData.length ? DAYS_3M_BACK : -1 },
						{ string: '6m', value: DAYS_6M_BACK <= chartData.length ? DAYS_6M_BACK : -1 },
						{ string: '1y', value: DAYS_1Y_BACK <= chartData.length ? DAYS_1Y_BACK : -1 },
						{ string: '2y', value: DAYS_2Y_BACK <= chartData.length ? DAYS_2Y_BACK : -1 },
						{ string: '3y', value: DAYS_3Y_BACK <= chartData.length ? DAYS_3Y_BACK : -1 },
						{ string: '4y', value: DAYS_4Y_BACK <= chartData.length ? DAYS_4Y_BACK : -1 },
						{ string: '5y', value: DAYS_5Y_BACK <= chartData.length ? DAYS_5Y_BACK : -1 },
						{ string: 'all', value: chartData.length ? chartData.length : -1 },
					]}
				</CheckGroup>
			</div>
			<div className="chartCard__control">
				<button
					className="chartCard__control--maximize"
					type="button"
					title="Maximize"
					onClick={handleOnDisplayModeChange}
					data-mode="max"
					hidden={chartDisplayMode === 'max'}
				/>
				<button
					className="chartCard__control--minimize"
					type="button"
					title="Minimize"
					onClick={handleOnDisplayModeChange}
					data-mode="default"
					hidden={chartDisplayMode === 'default' || chartDisplayMode === 'coll'}
				/>
				<button
					className="chartCard__control--arrow"
					type="button"
					title="Collapse"
					onClick={handleOnDisplayModeChange}
					data-mode="coll"
					hidden={chartDisplayMode === 'coll' || chartDisplayMode === 'max'}
				/>
				<button
					className="chartCard__control--arrow down"
					type="button"
					title="Expand"
					onClick={handleOnDisplayModeChange}
					data-mode="default"
					hidden={chartDisplayMode === 'default' || chartDisplayMode === 'max'}
				/>
				<button className="chartCard__control--close" type="button" title="Close" onClick={handleDeleteChart} />
			</div>
			<div className="chartCard__chartArea">{content}</div>
			<div className="chartCard__scaleSwitch"></div>
			<div className="chartCard__checkGroup chartCard__checkGroup--resolution">
				<CheckGroup
					initSelected={chartResolution}
					widthSize="md"
					selectHandler={handleOnResolutionChange}
					disabled={chartData.length <= 0}
					title="resolution"
				>
					{[
						{ string: '1 : 1', value: 1 },
						{ string: '1 : 2', value: 2 },
						{ string: '1 : 5', value: 5 },
						{ string: '1 : 10', value: 10 },
					]}
				</CheckGroup>
			</div>
			<div className="chartCard__checkGroup chartCard__checkGroup--scale">
				<CheckGroup
					initSelected={chartScale}
					widthSize="sm"
					selectHandler={handleOnScaleChange}
					disabled={chartData.length <= 0}
					title="scale"
				>
					{[
						{ string: 'lin', value: 'linear' },
						{ string: 'log', value: 'logarithmic' },
					]}
				</CheckGroup>
			</div>
			{selectedTicker === '' ? (
				''
			) : (
				<button
					className={`chartCard__settingsBtn ${chartDisplayMode} ${isOverlayOpen ? 'open' : 'closed'}`}
					title="Settings"
					onClick={handleToggleOverlay}
				>
					{isOverlayOpen ? (
						<IconClose className="icon--whiteStroke icon--sm" />
					) : (
						<IconSettings className="icon--primaryStroke icon--sm" />
					)}
				</button>
			)}
			{isOverlayOpen ? (
				<div className={`settingsOverlay ${chartDisplayMode}`}>
					<CheckGroup
						initSelected={chartDataCategory}
						widthSize="md"
						selectHandler={handleOnDataCategoryChange}
						disabled={chartData.length <= 0}
						title="data category"
					>
						{[
							{ string: 'Market Cap', value: 'mCap' },
							{ string: 'Volume', value: 'volume' },
							{ string: 'Price', value: 'price' },
						]}
					</CheckGroup>
					<CheckGroup
						initSelected={chartTimeSpan}
						widthSize="sm"
						selectHandler={handleOnTimeSpanChange}
						disabled={chartData.length <= 0}
						title="time span"
					>
						{[
							{ string: '1m', value: DAYS_1M_BACK <= chartData.length ? DAYS_1M_BACK : -1 },
							{ string: '3m', value: DAYS_3M_BACK <= chartData.length ? DAYS_3M_BACK : -1 },
							{ string: '6m', value: DAYS_6M_BACK <= chartData.length ? DAYS_6M_BACK : -1 },
							{ string: '1y', value: DAYS_1Y_BACK <= chartData.length ? DAYS_1Y_BACK : -1 },
							{ string: '2y', value: DAYS_2Y_BACK <= chartData.length ? DAYS_2Y_BACK : -1 },
							{ string: '3y', value: DAYS_3Y_BACK <= chartData.length ? DAYS_3Y_BACK : -1 },
							{ string: '4y', value: DAYS_4Y_BACK <= chartData.length ? DAYS_4Y_BACK : -1 },
							{ string: '5y', value: DAYS_5Y_BACK <= chartData.length ? DAYS_5Y_BACK : -1 },
							{ string: 'all', value: chartData.length ? chartData.length : -1 },
						]}
					</CheckGroup>
					<CheckGroup
						initSelected={chartResolution}
						widthSize="sm"
						selectHandler={handleOnResolutionChange}
						disabled={chartData.length <= 0}
						title="resolution"
					>
						{[
							{ string: '1 : 1', value: 1 },
							{ string: '1 : 2', value: 2 },
							{ string: '1 : 5', value: 5 },
							{ string: '1 : 10', value: 10 },
						]}
					</CheckGroup>
					<CheckGroup
						initSelected={chartScale}
						widthSize="sm"
						selectHandler={handleOnScaleChange}
						disabled={chartData.length <= 0}
						title="scale"
					>
						{[
							{ string: 'lin', value: 'linear' },
							{ string: 'log', value: 'logarithmic' },
						]}
					</CheckGroup>
				</div>
			) : (
				''
			)}
		</article>
	);
};

export default ChartCard;
