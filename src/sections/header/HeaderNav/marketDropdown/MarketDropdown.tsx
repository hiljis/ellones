import { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownList from '../../../../components/dropdownList/dropdownList';
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
					<Link to="/change">Change</Link>
					<Link to="/dominance">Dominance</Link>
					<Link to="/pairs">Pairs</Link>
				</DropdownList>
			)}
		</div>
	);
};

export default MarketDropdown;
