import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useEffect, useRef, useState } from 'react';
import { getBarChartOptions } from './BarChartOptions';
import { getBarBgColor } from '../chartUtils/colors';
import './BarChart.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
						label: 'hej',
						data: tickerData.map((data) => data.data.y),
						backgroundColor: tickerData.map((data) => getBarBgColor(data.ticker)),
					},
				],
			};
			console.log('joinedData: ', joinedData);
			setData(joinedData);
		}
	}, [tickerData]);

	console.log(data);
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
