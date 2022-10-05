import { useEffect, useState } from 'react';
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
import CheckGroup from '../../../components/checkGroup/CheckGroup';
import Loader from '../../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	fetchTickerStart,
	selectMarketData,
	selectMarketDataStatusByTicker,
} from '../../../store/marketData/marketDataSlice';
import {
	calcPairDataStart,
	changeDataCategory,
	changeDenominator,
	changeNumerator,
	changeTimeSpan,
	deletePair,
	PairDataCategory,
	selectPair,
	selectPairData,
	selectPairDataCategory,
	selectPairStatus,
	selectPairTimeSpan,
} from '../../../store/pairs/pairs.slice';
import PairChart from '../pairChart/PairChart';
import PairTickerPicker from '../pairTickerPicker/PairTickerPicker';
import './PairCard.scss';

type Props = {
	index: number;
};

const PairCard: React.FC<Props> = ({ index }) => {
	const dispatch = useAppDispatch();
	const { numerator, denominator } = useAppSelector((state) => selectPair(state, index));
	const marketDataStatusNumerator = useAppSelector((state) => selectMarketDataStatusByTicker(state, numerator));
	const marketDataStatusDenominator = useAppSelector((state) => selectMarketDataStatusByTicker(state, denominator));
	const marketDataNumerator = useAppSelector((state) => selectMarketData(state, numerator));
	const marketDataDenominator = useAppSelector((state) => selectMarketData(state, denominator));
	const pairStatus = useAppSelector((state) => selectPairStatus(state, index));
	const pairData = useAppSelector((state) => selectPairData(state, index));
	const pairDataCategory = useAppSelector((state) => selectPairDataCategory(state, index));
	const pairTimeSpan = useAppSelector((state) => selectPairTimeSpan(state, index));
	const [numeratorFailed, setNumeratorFailed] = useState(false);
	const [denominatorFailed, setDenominatorFailed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [trimmedPairData, setTrimmedPairData] = useState<MarketDataPoint[]>([]);

	useEffect(() => {
		if (numerator) {
			if (!marketDataStatusNumerator || marketDataStatusNumerator === 'idle') {
				dispatch(fetchTickerStart(numerator));
				setIsLoading(true);
			} else if (marketDataStatusNumerator === 'load-failed') {
				setNumeratorFailed(true);
				setIsLoading(false);
			}
		}
		if (denominator) {
			if (!marketDataStatusDenominator || marketDataStatusDenominator === 'idle') {
				dispatch(fetchTickerStart(denominator));
				setIsLoading(true);
			} else if (marketDataStatusDenominator === 'load-failed') {
				setDenominatorFailed(true);
				setIsLoading(false);
			}
		}
		if (pairStatus === 'calc-complete') {
			setNumeratorFailed(false);
			setDenominatorFailed(false);
			setTimeout(() => {
				setIsLoading(false);
			}, 100);
		} else if (numerator && denominator) {
			if (
				pairStatus === 'idle' &&
				marketDataStatusNumerator === 'load-success' &&
				marketDataStatusDenominator === 'load-success' &&
				marketDataNumerator &&
				marketDataDenominator
			) {
				let data;
				if (pairDataCategory === 'price') {
					data = {
						numeratorData: marketDataNumerator.priceHistory,
						denominatorData: marketDataDenominator.priceHistory,
					};
				} else if (pairDataCategory === 'mCap') {
					data = {
						numeratorData: marketDataNumerator.mCapHistory,
						denominatorData: marketDataDenominator.mCapHistory,
					};
				} else if (pairDataCategory === 'volume') {
					data = {
						numeratorData: marketDataNumerator.volumeHistory,
						denominatorData: marketDataDenominator.volumeHistory,
					};
				} else {
					data = {
						numeratorData: marketDataNumerator.mCapHistory,
						denominatorData: marketDataDenominator.mCapHistory,
					};
				}
				setIsLoading(true);
				dispatch(calcPairDataStart({ index, ...data }));
			}
		}
	}, [
		dispatch,
		marketDataStatusNumerator,
		marketDataStatusDenominator,
		index,
		numerator,
		denominator,
		marketDataDenominator,
		marketDataNumerator,
		pairStatus,
		pairDataCategory,
	]);

	useEffect(() => {
		setIsLoading(true);
		if (pairData && pairData.length > 0) {
			setTrimmedPairData(pairData.slice(pairData.length - pairTimeSpan));
			setTimeout(() => {
				setIsLoading(false);
			}, 200);
		}
	}, [pairTimeSpan, pairData]);

	const handleNumeratorSelect = (ticker: string) => {
		if (ticker !== numerator) dispatch(changeNumerator({ index: index, ticker: ticker }));
	};

	const handleDenominatorSelect = (ticker: string) => {
		if (ticker !== denominator) dispatch(changeDenominator({ index: index, ticker: ticker }));
	};

	const handleDeletePair = () => {
		dispatch(deletePair(index));
	};

	const handleOnDataCategoryChange = (dataCategory: PairDataCategory) => {
		dispatch(changeDataCategory({ index: index, dataCategory: dataCategory }));
	};

	const handleOnTimeSpanChange = (timeSpan: number) => {
		dispatch(changeTimeSpan({ index: index, timeSpan: timeSpan }));
	};

	let content;
	if (!numerator || !denominator) {
		content = <p className="pairCard__message">(Choose numerator & denominator)</p>;
	} else if (isLoading) {
		content = <Loader color="black" size="md" />;
	} else if (numeratorFailed) {
		content = <p className="pairCard__message">{`Failed to fetch market data for ${numerator}`}</p>;
	} else if (denominatorFailed) {
		content = <p className="pairCard__message">{`Failed to fetch market data for ${denominator}`}</p>;
	} else if (numeratorFailed && denominatorFailed) {
		content = (
			<p className="pairCard__message">{`Failed to fetch market data for both ${numerator} & ${denominator}`}</p>
		);
	} else {
		// content = <PairChart data={pairData.slice(pairData.length - pairTimeSpan)} />;
		content = <PairChart data={trimmedPairData} />;
	}

	console.log(marketDataStatusNumerator, marketDataStatusDenominator, pairStatus);
	return (
		<article className="pairCard">
			<button className="pairCard__btnClose" type="button" title="Close" onClick={handleDeletePair} />
			<div className="pairCard__settings">
				<CheckGroup
					initSelected={pairDataCategory}
					widthSize="md"
					selectHandler={handleOnDataCategoryChange}
					disabled={isLoading}
				>
					{[
						{ string: 'Market Cap', value: 'mCap' },
						{ string: 'Volume', value: 'volume' },
						{ string: 'Price', value: 'price' },
					]}
				</CheckGroup>

				{pairData?.length ? (
					<CheckGroup
						initSelected={pairTimeSpan}
						widthSize="sm"
						selectHandler={handleOnTimeSpanChange}
						disabled={isLoading}
					>
						{[
							{ string: '1m', value: DAYS_1M_BACK <= pairData.length ? DAYS_1M_BACK : -1 },
							{ string: '3m', value: DAYS_3M_BACK <= pairData.length ? DAYS_3M_BACK : -1 },
							{ string: '6m', value: DAYS_6M_BACK <= pairData.length ? DAYS_6M_BACK : -1 },
							{ string: '1y', value: DAYS_1Y_BACK <= pairData.length ? DAYS_1Y_BACK : -1 },
							{ string: '2y', value: DAYS_2Y_BACK <= pairData.length ? DAYS_2Y_BACK : -1 },
							{ string: '3y', value: DAYS_3Y_BACK <= pairData.length ? DAYS_3Y_BACK : -1 },
							{ string: '4y', value: DAYS_4Y_BACK <= pairData.length ? DAYS_4Y_BACK : -1 },
							{ string: '5y', value: DAYS_5Y_BACK <= pairData.length ? DAYS_5Y_BACK : -1 },
							{ string: 'all', value: pairData.length },
						]}
					</CheckGroup>
				) : (
					''
				)}
			</div>
			<div className="pairCard__numerator">
				<PairTickerPicker isNumerator={true} selectedTicker={numerator} selectHandler={handleNumeratorSelect} />
			</div>
			<div className="pairCard__chartArea">{content}</div>
			<div className="pairCard__denominator">
				<PairTickerPicker
					isNumerator={false}
					selectedTicker={denominator}
					selectHandler={handleDenominatorSelect}
				/>
			</div>
		</article>
	);
};

export default PairCard;
