import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
	changeSortTarget,
	selectMarketListSortAsc,
	selectMarketListSortTarget,
	SortTarget,
	toggleSortAsc,
} from '../../../store/marketList/marketListSlice';
import './BtnColSort.scss';

type Props = {
	children: React.ReactNode;
	sortTarget: SortTarget;
	className?: string;
};

const BtnColSort: React.FC<Props> = ({ children, sortTarget, className }) => {
	const dispatch = useAppDispatch();
	const selectActiveSortTarget = useAppSelector(selectMarketListSortTarget);
	const selectSortAsc = useAppSelector(selectMarketListSortAsc);

	const handleOnClick = () => {
		sortTarget === selectActiveSortTarget ? dispatch(toggleSortAsc()) : dispatch(changeSortTarget(sortTarget));
	};

	return (
		<button
			className={`marketList__btnColSort ${className} ${sortTarget === selectActiveSortTarget ? 'active' : ''} ${
				selectSortAsc ? 'asc' : 'desc'
			}`}
			onClick={handleOnClick}
			data-sortby="range"
		>
			{children}
		</button>
	);
};

export default BtnColSort;
