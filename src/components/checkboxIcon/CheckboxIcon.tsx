import React, { useId, useState } from 'react';
import { getIcon } from '../icons/Icons';
import './CheckboxIcon.scss';

type Props = {
	ticker: string;
	checkHandler?: Function;
};
const CheckboxIcon: React.FC<Props> = ({ ticker, checkHandler }) => {
	const id = useId();
	const [checked, setChecked] = useState(true);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.currentTarget.checked;
		setChecked(isChecked);
		if (checkHandler) checkHandler(ticker, isChecked);
	};

	const icon = checked ? getIcon(ticker, 'icon--white icon--sm') : getIcon(ticker, 'icon--black icon--sm');

	return (
		<div className="checkboxIcon">
			<input
				className="checkboxIcon--input"
				type="checkbox"
				id={id}
				name={id}
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
