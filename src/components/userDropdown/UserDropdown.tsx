import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser, selectUserStatus } from '../../store/user/userSlice';
import DropdownList from '../dropdownList/dropdownList';
import LinkButton from '../linkButton/LinkButton';
import Loader from '../loader/loader';
import './UserDropdown.scss';

const UserDropdown = () => {
	const user = useAppSelector(selectCurrentUser);
	const userStatus = useAppSelector(selectUserStatus);
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

	if (
		userStatus === 'checking-user-session' ||
		userStatus === 'signing-in' ||
		userStatus === 'signing-out' ||
		userStatus === 'signing-up'
	) {
		return (
			<div className="userDropdown">
				<div className="userDropdown__btn userDropdown__btn--checking">
					<Loader color="white" size="xs" thickness="thin" />
				</div>
			</div>
		);
	} else if (userStatus === 'sign-up-success') {
		return (
			<div className="userDropdown">
				<div className="userDropdown__btn userDropdown__btn--checking userDropdown__btn--checking--success">
					<Loader color="white" size="xs" thickness="thin" />
				</div>
			</div>
		);
	} else if (userStatus === 'sign-in-success' && user) {
		console.log(user);
		return (
			<div className="userDropdown" ref={ref}>
				<button
					className="userDropdown__btn"
					style={{ backgroundColor: user.avatarColor }}
					type="button"
					title="User"
					onClick={toggleIsOpen}
				>
					<div className="userDropdown__btn--icon">{user.username[0].toUpperCase()}</div>
				</button>
				<DropdownList show={isOpen} type="user" closeHandler={closeDropdownList}>
					<Link to="/account">My profile</Link>
					<Link to="/signout">Sign out</Link>
				</DropdownList>
			</div>
		);
	}

	return (
		<div className="userDropdown">
			<LinkButton to="/signin">Sign in</LinkButton>
		</div>
	);
};

export default UserDropdown;
