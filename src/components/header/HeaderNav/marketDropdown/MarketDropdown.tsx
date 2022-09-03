import { useState } from 'react';
import DropdownList from '../../../dropdownList/dropdownList';
import DropdownListItem from '../../../dropdownList/dropdownListItem/dropdownListItem';
import { ReactComponent as IconCaretDown } from '../icons/icon_caret-down.svg';
import './MarketDropdown.scss';

const MarketDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className="marketDropdown">
			<button className="marketDropdown__btn" type="button" title="Market" onClick={toggleIsOpen}>
				<span className="marketDropdown__btn--text">market</span>
				<IconCaretDown className="marketDropdown__btn--icon" />
			</button>
			{isOpen && (
				<DropdownList type="market">
					<DropdownListItem>price action</DropdownListItem>
					<DropdownListItem>dominance</DropdownListItem>
					<DropdownListItem>pairs</DropdownListItem>
				</DropdownList>
			)}
		</div>
	);
};

export default MarketDropdown;
