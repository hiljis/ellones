import { MarketDataPoint } from '../../../app/utils/types';
import LineChart from '../../../components/charts/lineChart/LineChart';
import { getPairlineChartOptions } from '../../../components/charts/lineChart/LineChartOptions';
import './PairChart.scss';

type Props = {
	data: MarketDataPoint[];
};

const PairChart: React.FC<Props> = ({ data }) => {
	const options = getPairlineChartOptions(data, 'mCap', 'linear', 1);
	return <LineChart chartData={data} borderColor={'rgba(0, 0, 255, 1)'} chartOptions={options} />;
};

export default PairChart;
