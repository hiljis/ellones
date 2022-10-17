import { ReactComponent as IconCaretDown } from '../../../assets/svg/icon_caret-down.svg';
import { NavLink } from 'react-router-dom';
import './BurgerNav.scss';
import { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectCurrentUser } from '../../../store/user/userSlice';

type Props = {
	open: boolean;
	closeHandler: Function;
};

const BurgerNav: React.FC<Props> = ({ open, closeHandler }) => {
	const currentUser = useAppSelector(selectCurrentUser);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const handleClose = () => {
		closeHandler();
	};
	const handleToggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};
	return (
		<nav className={`burgerNav ${open ? 'open' : ''}`}>
			<ul className="burgerNav__list">
				{currentUser ? (
					<li className="burgerNav__listItem">
						<NavLink to="/account" className="burgerNav__link" onClick={handleClose}>
							my profile
						</NavLink>
					</li>
				) : (
					<li className="burgerNav__listItem">
						<NavLink to="/signin" className="burgerNav__link" onClick={handleClose}>
							sign in
						</NavLink>
					</li>
				)}
				<li className="burgerNav__listItem">
					<NavLink to="/charts" className="burgerNav__link" onClick={handleClose}>
						charts
					</NavLink>
				</li>
				<li className="burgerNav__listItem">
					<NavLink to="/l1s" className="burgerNav__link" onClick={handleClose}>
						layer 1s
					</NavLink>
				</li>
				<li className="burgerNav__listItem">
					<div
						className={`burgerNav__dropdownButton ${dropdownOpen ? 'open' : ''}`}
						onClick={handleToggleDropdown}
					>
						<span className="burgerNav__dropdownButtonContent">
							market
							<IconCaretDown className="burgerNav__dropdownButtonIcon" />
						</span>
					</div>
					<ul className={`burgerNav__dropdownList ${dropdownOpen ? 'open' : ''}`}>
						<li className="burgerNav__dropdownListItem">
							<NavLink to="/change" className="burgerNav__dropdownLink" onClick={handleClose}>
								change
							</NavLink>
						</li>
						<li className="burgerNav__dropdownListItem">
							<NavLink to="/history" className="burgerNav__dropdownLink" onClick={handleClose}>
								history
							</NavLink>
						</li>
						<li className="burgerNav__dropdownListItem">
							<NavLink to="/dominance" className="burgerNav__dropdownLink" onClick={handleClose}>
								dominance
							</NavLink>
						</li>
						<li className="burgerNav__dropdownListItem">
							<NavLink to="/pairs" className="burgerNav__dropdownLink" onClick={handleClose}>
								pairs
							</NavLink>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
};

export default BurgerNav;
