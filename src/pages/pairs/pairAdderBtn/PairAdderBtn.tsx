import { useAppDispatch } from '../../../store/hooks';
import { addNewInitPair } from '../../../store/pairs/pairs.slice';
import './PairAdderBtn.scss';

const PairAdderBtn: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleAddInitPair = () => {
		dispatch(addNewInitPair());
	};

	return <button className="pairAdderBtn" title="Add Pair" type="button" onClick={handleAddInitPair} />;
};

export default PairAdderBtn;
