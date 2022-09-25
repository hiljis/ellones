import { useEffect, useState } from 'react';
import { CalcAlgo, selectAlgo } from '../../../../store/historyMatrix/historyMatrix.slice';
import { useAppSelector } from '../../../../store/hooks';
import HistoryRowData from '../historyRowData/HistoryRowData';
import './HistoryCalcData.scss';

type Props = {
	data: number[];
	target: 'algoMonth' | 'algoYear' | 'empty';
	complete?: boolean;
};
const HistoryCalcData: React.FC<Props> = ({ data, target, complete }) => {
	const [value, setValue] = useState(0);
	const selectedAlgo: CalcAlgo = useAppSelector((state) => selectAlgo(state, target));

	useEffect(() => {
		const validDataPoints = data.filter((d) => d !== -100);
		const numDataPoints = validDataPoints.length;
		if (target === 'empty' || numDataPoints === 0) {
			setValue(-100);
		} else if (selectedAlgo === 'avg') {
			const avg = validDataPoints.reduce((a, b) => a + b, 0) / numDataPoints;
			const formattedAvg = parseFloat(avg.toFixed(1));
			setValue(formattedAvg);
		} else if (selectedAlgo === 'min') {
			const min = validDataPoints.reduce((a, b) => (a < b ? a : b));
			const formattedMin = parseFloat(min.toFixed(1));
			setValue(formattedMin);
		} else if (selectedAlgo === 'max') {
			const max = validDataPoints.reduce((a, b) => (a > b ? a : b));
			const formattedMax = parseFloat(max.toFixed(1));
			setValue(formattedMax);
		} else if (selectedAlgo === 'median') {
			const midIndex = Math.floor(numDataPoints / 2);
			const sortedValues = [...validDataPoints].sort((a, b) => a - b);
			const median =
				numDataPoints % 2 !== 0
					? sortedValues[midIndex]
					: (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2;
			setValue(median);
		}
	}, [selectedAlgo, data]);
	return <HistoryRowData value={value} />;
};

export default HistoryCalcData;
