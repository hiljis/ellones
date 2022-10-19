import React, { useEffect, useId, useRef } from 'react';
import './dropdownList.scss';

type Props = {
	show: boolean;
	closeHandler: Function;
	children: React.ReactNode[];
	type: string;
};

const DropdownList: React.FC<Props> = ({ show, closeHandler, children, type }) => {
	const handleOnListItemClick = () => {
		closeHandler();
	};

	if (!show) {
		return null;
	}

	return (
		<ul className={`dropdownList dropdownList--${type}`}>
			{children.map((child, i) => (
				<li key={i} onClick={handleOnListItemClick}>
					{child}
				</li>
			))}
		</ul>
	);
};

export default DropdownList;
