import { MarketDataPoint } from '../../../app/utils/types';
import LineChart from '../../../components/charts/lineChart/LineChart';
import { getChartCardlineChartOptions } from '../../../components/charts/lineChart/LineChartOptions';
import './ChartCardChart.scss';

type Props = {
	data: MarketDataPoint[];
	dataCategory: string;
	scale: string;
	resolution: number;
	borderColor?: string;
    displayMode?: string;
};

const ChartCardChart: React.FC<Props> = ({ data, dataCategory, scale, resolution, borderColor, displayMode }) => {
	const options = getChartCardlineChartOptions(data, dataCategory, scale, resolution);
	return (
		<LineChart
			chartData={data}
			borderColor={borderColor ? borderColor : 'rgb(0,0,0)'}
			chartOptions={options}
			className={displayMode}
		/>
	);
};

export default ChartCardChart;
