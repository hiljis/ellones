import { addNewInitChart } from '../../../store/charts/charts.slice';
import { useAppDispatch } from '../../../store/hooks';
import './ChartAdderBtn.scss';

const ChartAdderBtn: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleAddInitChart = () => {
		dispatch(addNewInitChart());
	};

	return <button className="chartAdderBtn" title="Add Chart" type="button" onClick={handleAddInitChart} />;
};

export default ChartAdderBtn;
