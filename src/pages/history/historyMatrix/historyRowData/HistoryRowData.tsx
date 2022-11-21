import './HistoryRowData.scss';

type Props = {
	value: number;
	styleClass?: string;
};

const HistoryRowData: React.FC<Props> = ({ value, styleClass }) => {
	let formattedValue = parseFloat(value.toFixed(1));
	if (value === -100) return <td className={`historyMatrix__row--data empty ${styleClass}`}></td>;
	else if (formattedValue < -0.09)
		return <td className={`historyMatrix__row--data neg ${styleClass}`}>{formattedValue}%</td>;
	else if (formattedValue > 0.09)
		return <td className={`historyMatrix__row--data pos ${styleClass}`}>+{formattedValue}%</td>;
	else return <td className={`historyMatrix__row--data ${styleClass}`}>{formattedValue}%</td>;
};

export default HistoryRowData;
