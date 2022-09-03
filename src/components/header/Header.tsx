import ThemeDropdown from '../themeDropDown/ThemeDropDown';
import UserDropdown from '../userDropdown/UserDropdown';
import './Header.scss';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderNav from './HeaderNav/HeaderNav';

const Header = () => {
	return (
		<header className="header">
			<HeaderLogo />
			<HeaderNav />
			<div className="header--right">
				<ThemeDropdown />
				<UserDropdown />
			</div>
		</header>
	);
};

export default Header;
