import { Chart as ChartJS, ArcElement, Tooltip, Legend, registerables as registerablesJS } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useEffect, useRef, useState } from 'react';
import { getDoughnutChartOptions } from './DoughnutChartOptions';
import { getBarBgColor, getBorderColor } from '../chartUtils/colors';
import './DoughnutChart.scss';

// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(...registerablesJS);

const DoughnutChart = ({ tickerData, dataCategory }) => {
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
						borderColor: tickerData.map((data) => getBorderColor(data.ticker)),
						borderWidth: 0,
					},
				],
			};
			setData(joinedData);
		}
	}, [tickerData]);

	const options = getDoughnutChartOptions(data, dataCategory);

	return (
		<div className="chartBox--doughnut">
			{data && (
				<Chart
					ref={chartRef}
					type="doughnut"
					options={options}
					data={data}
					style={{ width: '100%', height: '100%' }}
				/>
			)}
		</div>
	);
};

export default DoughnutChart;
