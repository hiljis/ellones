import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	registerables as registerablesJS,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useEffect, useRef, useState } from 'react';
import { getBarChartOptions } from './BarChartOptions';
import { getBarBgColor } from '../chartUtils/colors';
import './BarChart.scss';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(...registerablesJS);

const BarChart = ({ tickerData, dataCategory }) => {
	const chartRef = useRef(null);
	const [data, setData] = useState({ labels: [], datasets: [] });

	useEffect(() => {
		const chart = chartRef.current;

		if (tickerData) {
			const joinedData = {
				labels: tickerData.map((data) => data.ticker.toUpperCase()),
				datasets: [
					{
						data: tickerData.map((data) => data.data.y),
						backgroundColor: tickerData.map((data) => getBarBgColor(data.ticker)),
					},
				],
			};
			setData(joinedData);
		}
	}, [tickerData]);

	const options = getBarChartOptions(data, dataCategory);
	// const options = {};

	return (
		<div className="chartBox--bar">
			{data && (
				<Chart
					ref={chartRef}
					type="bar"
					options={options}
					data={data}
					style={{ width: '100%', height: '100%' }}
				/>
			)}
		</div>
	);
};

export default BarChart;
