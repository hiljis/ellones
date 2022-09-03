import './HeaderNav.scss';
import MarketDropdown from './marketDropdown/MarketDropdown';

const HeaderNav = () => {
	return (
		<nav className="headerNav">
			<a className="headerNav__link headerNav__link--compare">compare</a>
			<a className="headerNav__link headerNav__link--l1s">layer 1s</a>
			<MarketDropdown />
		</nav>
	);
};

export default HeaderNav;
