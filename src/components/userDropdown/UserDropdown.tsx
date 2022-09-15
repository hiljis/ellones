import { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownList from '../dropdownList/dropdownList';
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
					<Link to="/account">My profile</Link>
					<Link to="/signout">Sign out</Link>
				</DropdownList>
			)}
		</div>
	);
};

export default UserDropdown;
