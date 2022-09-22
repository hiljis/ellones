import React from 'react';
import './dropdownList.scss';

type DropdownListProps = {
	children: React.ReactNode[];
	type: string;
};

const DropdownList = (props: DropdownListProps) => {
	return (
		<ul className={`dropdownList dropdownList--${props.type}`}>
			{props.children.map((child, i) => (
				<li key={i}>{child}</li>
			))}
		</ul>
	);
};

export default DropdownList;
