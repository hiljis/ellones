import ThemeDropdown from '../../components/themeDropDown/ThemeDropDown';
import UserDropdown from '../../components/userDropdown/UserDropdown';
import './Header.scss';
import LogoFull from '../../components/LogoFull/LogoFull';
import HeaderNav from './HeaderNav/HeaderNav';
import { useAppSelector } from '../../store/hooks';
import { selectGlobalTheme } from '../../store/theme/theme.slice';
import BurgerButton from './burgerButton/BurgerButton';
import BurgerNav from './burgerNav/BurgerNav';

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
			<BurgerButton />
		</header>
	);
};

export default Header;
