import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownList from '../../../../components/dropdownList/dropdownList';
import { ReactComponent as IconCaretDown } from '../icons/icon_caret-down.svg';
import './MarketDropdown.scss';

const MarketDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !(ref.current as Element).contains(e.target as Element)) {
				setIsOpen(false);
			}
		};

		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdownList = () => {
		setIsOpen(false);
	};

	return (
		<div className="marketDropdown" ref={ref}>
			<button className="marketDropdown__btn" type="button" title="Market" onClick={toggleIsOpen}>
				<span className="marketDropdown__btn--text">market</span>
				<IconCaretDown className="marketDropdown__btn--icon" />
			</button>
			<DropdownList show={isOpen} type="market" closeHandler={closeDropdownList}>
				<Link to="/change">Change</Link>
				<Link to="/history">History</Link>
				<Link to="/dominance">Dominance</Link>
				<Link to="/pairs">Pairs</Link>
			</DropdownList>
		</div>
	);
};

export default MarketDropdown;
