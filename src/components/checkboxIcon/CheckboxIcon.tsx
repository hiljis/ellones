import React, { useEffect, useId, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectMarketDataStatusByTicker } from '../../store/marketData/marketDataSlice';
import { getIcon } from '../icons/Icons';
import './CheckboxIcon.scss';

type Props = {
	ticker: string;
	checkHandler?: Function;
	name?: string;
	parentChecked?: boolean;
	color?: 'primary' | 'warning' | 'success';
	size?: 'sm' | 'md';
};
const CheckboxIcon: React.FC<Props> = ({ ticker, checkHandler, name, parentChecked, color, size }) => {
	const id = useId();
	const [checked, setChecked] = useState(true);

	useEffect(() => {
		if (typeof parentChecked === 'boolean') {
			setChecked(parentChecked);
		}
	}, [parentChecked]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const targetIsChecked = e.currentTarget.checked;
		if (checkHandler && typeof parentChecked === 'boolean') {
			checkHandler(ticker, targetIsChecked);
		} else if (checkHandler) {
			checkHandler(ticker, targetIsChecked);
			setChecked(targetIsChecked);
		} else {
			setChecked(targetIsChecked);
		}
	};

	let icon = checked
		? getIcon(ticker, `icon--${color ? color : 'white'} icon--sm`)
		: getIcon(ticker, `icon--${color ? color : 'black'} icon--sm`);

	return (
		<div className={`checkboxIcon ${size}`}>
			<input
				className="checkboxIcon--input"
				type="checkbox"
				id={id}
				name={name ? name : id}
				onChange={handleOnChange}
				checked={checked}
				value={ticker}
			/>
			<label className="checkboxIcon--label" htmlFor={id}>
				{icon}
			</label>
		</div>
	);
};

export default CheckboxIcon;
