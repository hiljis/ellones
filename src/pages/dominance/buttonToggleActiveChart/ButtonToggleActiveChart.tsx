import { useEffect, useState } from 'react';
import { ReactComponent as IconBarChart } from '../../../assets/svg/icon_bar-chart.svg';
import { ReactComponent as IconPieChart } from '../../../assets/svg/icon_pie-chart.svg';
import {
	initDuoState,
	initSingleState,
	selectActiveChart,
	switchChart,
	toggleChart,
} from '../../../store/dominance/dominance.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import './ButtonToggleActiveChart.scss';

const ButtonToggleActiveChart: React.FC = () => {
	const dispatch = useAppDispatch();
	const activeChart = useAppSelector(selectActiveChart);
	const [icon, setIcon] = useState(<></>);

	useEffect(() => {
		dispatch(initSingleState());
		return () => {
			dispatch(initDuoState());
		};
	}, []);

	useEffect(() => {
		if (activeChart === 'bar') setIcon(<IconBarChart className="icon--sm icon--primaryStroke" />);
		else setIcon(<IconPieChart className="icon--sm icon--primaryStroke" />);
	}, [activeChart]);

	const handleOnClick = () => {
		dispatch(switchChart());
	};

	return (
		<button className="buttonToggleActiveChart" type="button" title="Toggle chart" onClick={handleOnClick}>
			{icon}
		</button>
	);
};

export default ButtonToggleActiveChart;
