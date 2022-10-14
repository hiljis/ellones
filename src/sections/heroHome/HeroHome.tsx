import { NavLink } from 'react-router-dom';
import { ReactComponent as IconArrowDown } from '../../assets/svg/Icon__arrowDown.svg';
import './HeroHome.scss';

const HeroHome: React.FC = () => {
	return (
		<section className="section__heroHome">
			<div className="heroHome__headers">
				<h1 className="heroHeader heroHeader--animated">ellones</h1>
				<h3 className="heroSubHeader heroSubHeader--animated">shared history</h3>
			</div>
			<NavLink className="heroHome__link" to="#sectionCarousel" title="Scroll Down">
				<IconArrowDown className="heroHome__link__icon" />
			</NavLink>
		</section>
	);
};

export default HeroHome;
