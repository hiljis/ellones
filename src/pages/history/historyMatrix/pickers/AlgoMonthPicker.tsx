import { CalcAlgo, changeAlgoMonth, selectAlgoMonth } from '../../../../store/historyMatrix/historyMatrix.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import HistoryCornerPicker from './historyCornerPicker/HistoryCornerPicker';

const AlgoMonthPicker: React.FC = () => {
	const selectedAlgo: CalcAlgo = useAppSelector(selectAlgoMonth);
	const selectionAlgos: CalcAlgo[] = ['avg', 'median', 'min', 'max'];
	const dispatch = useAppDispatch();

	function handleOnSelect(selection: string) {
		dispatch(changeAlgoMonth(selection as CalcAlgo));
	}

	return (
		<HistoryCornerPicker
			selectHandler={handleOnSelect}
			selected={selectedAlgo}
			selections={selectionAlgos}
			menuDirection="right"
		/>
	);
};

export default AlgoMonthPicker;
