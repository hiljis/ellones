import { useState } from 'react';
import DropdownList from '../dropdownList/dropdownList';
import DropdownListItem from '../dropdownList/dropdownListItem/dropdownListItem';
import './UserDropdown.scss';

const UserDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className="userDropdown">
			<button className="userDropdown__btn" type="button" title="User" onClick={toggleIsOpen}>
				<div className="userDropdown__btn--icon">H</div>
			</button>
			{isOpen && (
				<DropdownList type="user">
					<DropdownListItem>my profile</DropdownListItem>
					<DropdownListItem>sign out</DropdownListItem>
				</DropdownList>
			)}
		</div>
	);
};

export default UserDropdown;
