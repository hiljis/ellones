import { Link } from 'react-router-dom';
import { ReactComponent as EllonesLogo } from '../../assets/svg/ellones_logo-black--50.svg';
import './LogoFull.scss';

const LogoFull = () => {
	return (
		<Link to="/" className="logoFull">
			<EllonesLogo className="logoFull--img" />
			<p className="logoFull--text">ellones</p>
		</Link>
	);
};

export default LogoFull;
