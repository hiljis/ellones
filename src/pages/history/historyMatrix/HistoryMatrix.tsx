import HistoryCalcData from './historyCalcData/HistoryCalcData';
import HistoryRow from './historyRow/HistoryRow';
import AlgoMonthPicker from './pickers/AlgoMonthPicker';
import AlgoYearPicker from './pickers/AlgoYearPicker';
import DataPicker from './pickers/DataPicker';
import TickerPicker from './pickers/tickerPicker/TickerPicker';
import './HistoryMatrix.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectHistoryData, selectTicker } from '../../../store/historyMatrix/historyMatrix.slice';
import Loader from '../../../components/loader/loader';
import { fetchTickerStart, selectMarketDataStatusByTicker } from '../../../store/marketData/marketDataSlice';
import { useEffect, useState } from 'react';
import { HistoryStateMessage } from './historyStateMessage/HistoryStateMessage';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const convertYearDataToMonthData = (data: number[][]): number[][] => {
	const jan: number[] = [];
	const feb: number[] = [];
	const mar: number[] = [];
	const apr: number[] = [];
	const may: number[] = [];
	const jun: number[] = [];
	const jul: number[] = [];
	const aug: number[] = [];
	const sep: number[] = [];
	const oct: number[] = [];
	const nov: number[] = [];
	const dec: number[] = [];
	data.forEach((year) => {
		jan.push(year[0]);
		feb.push(year[1]);
		mar.push(year[2]);
		apr.push(year[3]);
		may.push(year[4]);
		jun.push(year[5]);
		jul.push(year[6]);
		aug.push(year[7]);
		sep.push(year[8]);
		oct.push(year[9]);
		nov.push(year[10]);
		dec.push(year[11]);
	});
	return [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
};
const emptyTfootData = [[], [], [], [], [], [], [], [], [], [], [], []];

const HistoryMatrix: React.FC = () => {
	const ticker = useAppSelector(selectTicker);
	const historyData = useAppSelector(selectHistoryData);

	if (!historyData) {
		return (
			<table className="historyMatrix historyMatrix--loading">
				<thead className="historyMatrix__header">
					<tr>
						<TickerPicker />
						{months.map((month, i) => (
							<th className="historyMatrix__colHead" key={i}>
								{month}
							</th>
						))}
						<AlgoYearPicker />
					</tr>
				</thead>
				<tbody className="historyMatrix__body historyMatrix__body--loading">
					<tr>
						<td>
							<HistoryStateMessage ticker={ticker} />
						</td>
					</tr>
				</tbody>
				<tfoot className="historyMatrix__footer">
					<tr>
						<AlgoMonthPicker />
						{emptyTfootData.map((data, i) => (
							<HistoryCalcData data={data} target={'empty'} key={i} />
						))}
						<DataPicker />
					</tr>
				</tfoot>
			</table>
		);
	}
	const monthlyData = convertYearDataToMonthData(historyData.map((data) => data.months.map((month) => month.change)));
	return (
		<table className="historyMatrix">
			<thead className="historyMatrix__header">
				<tr>
					<TickerPicker />
					{months.map((month, i) => (
						<th className="historyMatrix__colHead" key={i}>
							{month}
						</th>
					))}
					<AlgoYearPicker />
				</tr>
			</thead>
			<tbody className="historyMatrix__body">
				{historyData.map((data, i) => {
					return <HistoryRow year={data.year} data={data.months.map((month) => month.change)} key={i} />;
				})}
			</tbody>
			<tfoot className="historyMatrix__footer">
				<tr>
					<AlgoMonthPicker />
					{monthlyData.map((data, i) => (
						<HistoryCalcData data={data} target={'algoMonth'} key={i} />
					))}
					<DataPicker />
				</tr>
			</tfoot>
		</table>
	);
};

export default HistoryMatrix;
