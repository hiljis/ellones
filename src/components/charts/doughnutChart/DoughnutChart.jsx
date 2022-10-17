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

const initData = {
	labels: ['No data'],
	datasets: [
		{
			data: [11],
			backgroundColor: 'rgba(0,0,0,0)',
			borderColor: 'rgba(0,0,0,0.05)',
			borderWidth: 2,
		},
	],
};

const DoughnutChart = ({ tickerData, dataCategory }) => {
	const chartRef = useRef(null);
	const [data, setData] = useState(initData);

	useEffect(() => {
		const chart = chartRef.current;
		let isEmptyData = true;

		if (tickerData) {
			const joinedData = {
				labels: tickerData.map((data) => data.ticker.toUpperCase()),
				datasets: [
					{
						data: tickerData.map((data) => {
							if (data.data.y !== 0) isEmptyData = false;
							return data.data.y;
						}),
						backgroundColor: tickerData.map((data) => getBarBgColor(data.ticker)),
						borderColor: tickerData.map((data) => getBorderColor(data.ticker)),
						borderWidth: 0,
					},
				],
			};
			setData(joinedData);
		}
		if (isEmptyData) {
			setData(initData);
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
