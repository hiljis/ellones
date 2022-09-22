import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ActiveData, changeActiveData, selectMarketListActiveData } from '../../../store/marketList/marketListSlice';
import './BtnDataSelect.scss';

type Props = {
	children: React.ReactNode;
	dataTarget: ActiveData;
	className?: string;
};

const BtnDataSelect: React.FC<Props> = ({ children, dataTarget, className }) => {
	const dispatch = useAppDispatch();
	const selectActiveData = useAppSelector(selectMarketListActiveData);

	const handleOnClick = () => {
		dispatch(changeActiveData(dataTarget));
	};

	return (
		<button
			className={`marketList__btnDataSelect ${className} ${dataTarget === selectActiveData ? 'active' : ''}`}
			type="button"
			onClick={handleOnClick}
		>
			{children}
		</button>
	);
};

export default BtnDataSelect;
