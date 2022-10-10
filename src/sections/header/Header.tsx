import ThemeDropdown from '../../components/themeDropDown/ThemeDropDown';
import UserDropdown from '../../components/userDropdown/UserDropdown';
import './Header.scss';
import LogoFull from '../../components/LogoFull/LogoFull';
import HeaderNav from './HeaderNav/HeaderNav';
import { useAppSelector } from '../../store/hooks';
import { selectGlobalTheme } from '../../store/theme/theme.slice';

const Header = () => {
	const theme = useAppSelector(selectGlobalTheme);

	return (
		<header className={`header ${theme}`}>
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
