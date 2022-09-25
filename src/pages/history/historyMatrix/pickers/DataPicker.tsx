import { changeDataTarget, DataTarget, selectDataTarget } from '../../../../store/historyMatrix/historyMatrix.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import HistoryCornerPicker from './historyCornerPicker/HistoryCornerPicker';

const DataPicker: React.FC = () => {
	const selectedData: DataTarget = useAppSelector(selectDataTarget);
	const selectionAlgos: DataTarget[] = ['price', 'mCap', 'volume'];
	const dispatch = useAppDispatch();

	function handleOnSelect(selection: string) {
		dispatch(changeDataTarget(selection as DataTarget));
	}

	return (
		<HistoryCornerPicker
			selectHandler={handleOnSelect}
			selected={selectedData}
			selections={selectionAlgos}
			menuDirection="left"
		/>
	);
};

export default DataPicker;
