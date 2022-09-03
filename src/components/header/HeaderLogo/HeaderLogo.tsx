import { ReactComponent as EllonesLogo } from '../../../assets/svg/ellones_logo-black--50.svg';
import './HeaderLogo.scss';

const HeaderLogo = () => {
	return (
		<div className="headerLogo">
			<EllonesLogo className="headerLogo--img" />
			<p className="headerLogo--text">ellones</p>
		</div>
	);
};

export default HeaderLogo;
