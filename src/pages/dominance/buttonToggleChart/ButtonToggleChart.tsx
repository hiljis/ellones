import { useEffect, useLayoutEffect, useState } from 'react';
import { ReactComponent as IconBarChart } from '../../../assets/svg/icon_bar-chart.svg';
import { ReactComponent as IconPieChart } from '../../../assets/svg/icon_pie-chart.svg';
import { selectIsChartActive, toggleChart } from '../../../store/dominance/dominance.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import './ButtonToggleChart.scss';

type Props = {
	dataTarget: 'bar' | 'doughnut';
};

const ButtonToggleChart: React.FC<Props> = ({ dataTarget }) => {
	const isChartActive = useAppSelector((state) => selectIsChartActive(state, dataTarget));
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState('');

	useEffect(() => {
		isChartActive ? setTitle('Deactivate') : setTitle('Activate');
	}, [isChartActive]);

	const handleOnClick = () => {
		dispatch(toggleChart(dataTarget));
	};

	return (
		<button
			className={`buttonToggleChart ${isChartActive ? 'active' : 'deactivated'}`}
			title={title}
			onClick={handleOnClick}
			type="button"
		>
			{dataTarget === 'bar' ? (
				<IconBarChart className={`icon--sm ${isChartActive ? 'icon--primaryStroke' : 'icon--blackStroke'}`} />
			) : (
				<IconPieChart className={`icon--sm ${isChartActive ? 'icon--primaryStroke' : 'icon--blackStroke'}`} />
			)}
		</button>
	);
};

export default ButtonToggleChart;
