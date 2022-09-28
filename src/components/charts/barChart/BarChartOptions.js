import { getMCapTick, getPriceTick, getVolumeTick } from '../chartUtils/ticks';
import { getMCapTooltip, getVolumeTooltip } from '../chartUtils/tooltips';

export const getBarChartOptions = (chartData, dataCategory) => {
	return {
		responsive: true,
		maintainAspectRatio: false,
		// parsing: false,
		// animation: true,
		scales: {
			y: {
				// indexAxis: 'xAxis',
				position: 'left',
				// reverse: false,
				bounds: 'ticks',
				beginAtZero: true,
				ticks: {
					callback: (value, i, t) => {
						console.log(chartData);
						if (dataCategory === 'mCap') return getMCapTick(value);
						if (dataCategory === 'volume') return getVolumeTick(value);
						if (dataCategory === 'price') return getPriceTick(value);
					},
					// maxRotation: 0,
					color: 'rgba(0, 0, 0, 1)',
					padding: 10,
					display: true,
					font: {
						family: "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						size: 10,
						weight: 600,
						lineHeight: 1,
						style: 'normal',
					},
					crossAlign: 'far',
				},
				grid: {
					display: true,
					color: 'rgba(0, 0, 0, 0.05)',
					lineWidth: 1,
					drawBorder: false,
					drawTicks: true,
					tickLength: 10,
				},
			},
			x: {
				ticks: {
					padding: 10,
					minRotation: 45,
					color: 'rgba(0, 0, 0, 1)',
					font: {
						family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
						size: 10,
						weight: 600,
						lineHeight: 1,
						style: 'normal',
					},
				},
				grid: {
					display: false,
					borderColor: 'rgba(0, 0, 255, 1)',
					borderWidth: 0,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
				// position: 'top',
			},
			title: {
				display: false,
			},
			tooltip: {
				position: 'average',
				borderWidth: 0,
				backgroundColor: 'rgba(0, 0, 0, 1)',
				bodyColor: 'white',
				padding: 10,
				titleFont: {
					size: 14,
					weight: 500,
				},
				titleAlign: 'center',
				caretSize: 0,
				caretPadding: 20,
				displayColors: true,
				cornerRadius: 0,
				boxWidth: 5,
				boxHeight: 5,
				boxPadding: 5,
				usePointStyle: true,
				xAlign: 'right',
				yAlign: 'bottom',
				animation: false,
				callbacks: {
					label: (data) => {
						if (dataCategory === 'mCap') return getMCapTooltip(data);
						if (dataCategory === 'volume') return getVolumeTooltip(data);
						return getMCapTooltip(data);
					},
				},
			},
		},
	};
};
