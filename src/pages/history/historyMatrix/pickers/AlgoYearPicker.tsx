import { CalcAlgo, changeAlgoYear, selectAlgoYear } from '../../../../store/historyMatrix/historyMatrix.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import HistoryCornerPicker from './historyCornerPicker/HistoryCornerPicker';

const AlgoYearPicker: React.FC = () => {
	const selectedAlgo: CalcAlgo = useAppSelector(selectAlgoYear);
	const selectionAlgos: CalcAlgo[] = ['avg', 'median', 'min', 'max'];
	const dispatch = useAppDispatch();

	function handleOnSelect(selection: string) {
		dispatch(changeAlgoYear(selection as CalcAlgo));
	}

	return (
		<HistoryCornerPicker
			selectHandler={handleOnSelect}
			selected={selectedAlgo}
			selections={selectionAlgos}
			menuDirection="down"
		/>
	);
};

export default AlgoYearPicker;
