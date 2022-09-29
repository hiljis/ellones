import { string } from 'yup';
import { MarketDataPoint } from '../../../app/utils/types';
import LineChart from '../../../components/charts/lineChart/LineChart';
import { useAppSelector } from '../../../store/hooks';
import { selectMarketData } from '../../../store/marketData/marketDataSlice';
import './PairChart.scss';

type Props = {
	data: MarketDataPoint[];
};

const PairChart: React.FC<Props> = ({ data }) => {
	return <LineChart chartData={data} />;
};

export default PairChart;
