import LinkText from '../../../components/linkText/LinkText';
import './HeaderNav.scss';
import MarketDropdown from './marketDropdown/MarketDropdown';

const HeaderNav = () => {
	return (
		<nav className="headerNav">
			<LinkText to="/compare" type="compare">
				compare
			</LinkText>
			<LinkText to="/l1s" type="l1s">
				layer 1s
			</LinkText>
			<MarketDropdown />
		</nav>
	);
};

export default HeaderNav;
