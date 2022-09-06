import { ReactComponent as IconArrowDown } from './icons/Icon__heroHome--arrowDown.svg';
import './HeroHome.scss';

const HeroHome: React.FC = () => {
	return (
		<section className="section__heroHome">
			<div className="heroHome__headers">
				<h1 className="heroHeader heroHeader--animated">ellones</h1>
				<h3 className="heroSubHeader heroSubHeader--animated">shared history</h3>
			</div>
			<a className="heroHome__link" href="#sectionCarousel" title="Scroll Down">
				<IconArrowDown className="heroHome__link__icon" />
			</a>
		</section>
	);
};

export default HeroHome;
