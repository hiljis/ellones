import { useState } from 'react';
import { ReactComponent as IconTheme } from './icons/icon_theme--25.svg';
import { ReactComponent as IconLight } from './icons/Icon_sun.svg';
import { ReactComponent as IconDark } from './icons/icon_moon.svg';
import { ReactComponent as IconBlue } from './icons/icon_blue.svg';
import DropdownList from '../dropdownList/dropdownList';
import DropdownListItem from '../dropdownList/dropdownListItem/dropdownListItem';
import './ThemeDropDown.scss';

const ThemeDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="themeDropdown">
			<button className="themeDropdown__btn" type="button" title="Theme" onClick={toggleIsOpen}>
				<IconTheme className="themeDropdown__btn--icon" />
			</button>
			{isOpen && (
				<DropdownList type="theme">
					<DropdownListItem>
						<IconLight />
						<span>light</span>
					</DropdownListItem>
					<DropdownListItem>
						<IconDark />
						<span>dark</span>
					</DropdownListItem>
					<DropdownListItem>
						<IconBlue />
						<span>blue</span>
					</DropdownListItem>
				</DropdownList>
			)}
		</div>
	);
};

export default ThemeDropdown;
