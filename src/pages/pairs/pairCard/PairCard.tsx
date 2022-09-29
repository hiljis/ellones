import { useEffect, useState } from 'react';
import Loader from '../../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	fetchMarketData,
	selectMarketData,
	selectMarketDataTickerStatus,
} from '../../../store/marketData/marketDataSlice';
import {
	calcPairDataStart,
	changeDenominator,
	changeNumerator,
	deletePair,
	selectPair,
	selectPairData,
	selectPairStatus,
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
	const marketDataStatusNumerator = useAppSelector((state) => selectMarketDataTickerStatus(state, numerator));
	const marketDataStatusDenominator = useAppSelector((state) => selectMarketDataTickerStatus(state, denominator));
	const marketDataNumerator = useAppSelector((state) => selectMarketData(state, numerator));
	const marketDataDenominator = useAppSelector((state) => selectMarketData(state, denominator));
	const pairStatus = useAppSelector((state) => selectPairStatus(state, index));
	const pairData = useAppSelector((state) => selectPairData(state, index));
	const [numeratorFailed, setNumeratorFailed] = useState(false);
	const [denominatorFailed, setDenominatorFailed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (numerator && denominator) {
			if (marketDataStatusNumerator === 'idle' || marketDataStatusNumerator === null) {
				dispatch(fetchMarketData({ ticker: numerator }));
			} else if (marketDataStatusDenominator === 'idle' || marketDataStatusDenominator === null) {
				dispatch(fetchMarketData({ ticker: denominator }));
			} else if (marketDataStatusNumerator === 'failed') {
				setNumeratorFailed(true);
				setIsLoading(false);
			} else if (marketDataStatusDenominator === 'failed') {
				setDenominatorFailed(true);
				setIsLoading(false);
			} else if (pairStatus === 'idle' && marketDataNumerator && marketDataDenominator) {
				const numeratorData = marketDataNumerator.priceHistory;
				const denominatorData = marketDataDenominator.priceHistory;
				const payload = { index, numeratorData, denominatorData };
				setIsLoading(true);
				dispatch(calcPairDataStart(payload));
			} else if (pairStatus === 'calc-complete') {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
				// setIsLoading(false);
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
	]);

	const handleNumeratorSelect = (ticker: string) => {
		dispatch(changeNumerator({ index: index, ticker: ticker }));
	};

	const handleDenominatorSelect = (ticker: string) => {
		dispatch(changeDenominator({ index: index, ticker: ticker }));
	};

	const handleDeletePair = () => {
		dispatch(deletePair(index));
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
		content = <PairChart data={pairData} />;
	}

	return (
		<article className="pairCard">
			<button className="pairCard__btnClose" type="button" title="Close" onClick={handleDeletePair} />
			<PairTickerPicker isNumerator={true} selectedTicker={numerator} selectHandler={handleNumeratorSelect} />
			{content}
			<PairTickerPicker
				isNumerator={false}
				selectedTicker={denominator}
				selectHandler={handleDenominatorSelect}
			/>
		</article>
	);
};

export default PairCard;
