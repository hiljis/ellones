import { DAYS_1Y_BACK } from '../../../app/utils/consts';
import { useAppSelector } from '../../../store/hooks';
import { selectPriceHistoryRange } from '../../../store/marketData/marketDataSlice';
import LineChart from '../lineChart/LineChart';
import { getPresentationChartOptions } from '../lineChart/LineChartOptions';
import { presentationBorderColor } from './presentationBorderColor';
import './PresentationChart.scss';

type Props = {
	ticker: string;
};

export const PresentationChart: React.FC<Props> = ({ ticker }) => {
	const data = useAppSelector((state) => selectPriceHistoryRange(state, ticker, DAYS_1Y_BACK));
	const options = getPresentationChartOptions(ticker, data, 'linear', 1);
	return <LineChart chartData={data} borderColor={presentationBorderColor[ticker]} chartOptions={options} />;
};

export default PresentationChart;
