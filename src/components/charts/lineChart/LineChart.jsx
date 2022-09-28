import { Chart } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	BarElement,
	LinearScale,
	LogarithmicScale,
	TimeScale,
	TimeSeriesScale,
	CategoryScale,
	Decimation,
	Tooltip,
	Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import { enGB } from 'date-fns/locale';
import './LineChart.scss';
import { useEffect, useRef, useState } from 'react';
import { getlineChartOptions } from './LineChartOptions';
import { getGradientColors } from '../../utils/colors';

ChartJS.register(
	BarElement,
	LinearScale,
	LogarithmicScale,
	TimeScale,
	TimeSeriesScale,
	CategoryScale,
	Decimation,
	Tooltip,
	Filler,
	zoomPlugin
);

const createGradient = (ctx, area, id) => {
	const { colorStart, colorEnd } = getGradientColors(id);
	const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
	gradient.addColorStop(0, colorStart);
	gradient.addColorStop(1, colorEnd);
	return gradient;
};

const initData = {
	datasets: [
		{
			backgroundColor: ['rgba(0, 0, 0, 0.25)'],
			borderColor: 'rgba(0, 0, 0, 0)',
			pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.5)',
			pointHoverBorderColor: 'rgba(0, 0, 0, 1)',
			yAxisID: `y-axis-1`,
			xAxisID: `xAxis`,
		},
	],
};

const LineChart = ({ chartData, datasetLabel, type, resolution }) => {
	const chartRef = useRef(null);
	const [data, setData] = useState({ datasets: [] });

	useEffect(() => {
		const chart = chartRef.current;

		if (!chart) return;

		const joinedData = {
			...initData,
			datasets: initData.datasets.map((dataset) => ({
				...dataset,
				label: datasetLabel,
				data: chartData,
				backgroundColor: createGradient(chart.ctx, chart.chartArea, datasetLabel),
			})),
		};

		setData(joinedData);
	}, [chartData, datasetLabel]);

	const options = getlineChartOptions(chartData, type, resolution);

	const resetZoom = () => {
		chartRef.current.resetZoom();
	};

	return (
		<div className="chartBox--line">
			<Chart
				ref={chartRef}
				type="line"
				data={data}
				options={options}
				onDoubleClick={resetZoom}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
};

export default LineChart;
