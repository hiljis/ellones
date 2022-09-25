import HistoryCalcData from '../historyCalcData/HistoryCalcData';
import HistoryRowData from '../historyRowData/HistoryRowData';
import './HistoryRow.scss';

type Props = {
	year: string | number;
	data: number[];
};

const HistoryRow: React.FC<Props> = ({ year, data }) => {
	let isIncompleteYear = false;
	if (data.length < 12) isIncompleteYear = true;

	const dataElements = [];
	for (let i = 0; i < 12; i++) {
		if (data[i] === undefined && i === 11)
			dataElements.push(<HistoryRowData value={-100} styleClass={'dec'} key={i} />);
		else if (data[i] === undefined) dataElements.push(<HistoryRowData value={-100} key={i} />);
		else if (i === 11) dataElements.push(<HistoryRowData value={data[i]} styleClass={'dec'} key={i} />);
		else dataElements.push(<HistoryRowData value={data[i]} key={i} />);
	}

	return (
		<tr className="historyMatrix__row">
			<td className="historyMatrix__row--head">{year}</td>
			{dataElements}
			<HistoryCalcData data={data} target={'algoYear'} complete={isIncompleteYear} />
		</tr>
	);
};

export default HistoryRow;
