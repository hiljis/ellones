import ThemeDropdown from '../../components/themeDropDown/ThemeDropDown';
import UserDropdown from '../../components/userDropdown/UserDropdown';
import './Header.scss';
import LogoFull from '../../components/LogoFull/LogoFull';
import HeaderNav from './HeaderNav/HeaderNav';

const Header = () => {
	return (
		<header className="header">
			<LogoFull />
			<HeaderNav />
			<div className="header--right">
				<ThemeDropdown />
				<UserDropdown />
			</div>
		</header>
	);
};

export default Header;
