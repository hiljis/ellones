import { ReactComponent as EllonesLogo } from '../../assets/svg/ellones_logo-black--50.svg';
import './LogoFull.scss';

const LogoFull = () => {
	return (
		<div className="logoFull">
			<EllonesLogo className="logoFull--img" />
			<p className="logoFull--text">ellones</p>
		</div>
	);
};

export default LogoFull;
