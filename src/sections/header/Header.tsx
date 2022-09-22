import ThemeDropdown from '../../components/themeDropDown/ThemeDropDown';
import UserDropdown from '../../components/userDropdown/UserDropdown';
import './Header.scss';
import LogoFull from '../../components/LogoFull/LogoFull';
import HeaderNav from './HeaderNav/HeaderNav';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/userSlice';
import LinkButton from '../../components/linkButton/LinkButton';

const Header = () => {
	const currentUser = useAppSelector(selectCurrentUser);
	return (
		<header className="header">
			<LogoFull />
			<HeaderNav />
			<div className="header--right">
				<ThemeDropdown />
				{currentUser && <UserDropdown />}
				{!currentUser && <LinkButton to="/signin">Sign in</LinkButton>}
			</div>
		</header>
	);
};

export default Header;
