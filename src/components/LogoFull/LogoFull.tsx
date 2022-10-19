import { Link } from 'react-router-dom';
import { ReactComponent as EllonesLogo } from '../../assets/svg/ellones_logo-black--50.svg';
import { ReactComponent as EllonesLogoInvert } from '../../assets/svg/ellones_logo-black--invert--50.svg';
import './LogoFull.scss';

type Props = {
	invert?: boolean;
};

const LogoFull: React.FC<Props> = ({ invert = false }) => {
	return (
		<Link to="/" className="logoFull">
			{invert ? <EllonesLogoInvert className="logoFull--img" /> : <EllonesLogo className="logoFull--img" />}
			<p className={`logoFull--text ${invert ? 'white' : 'black'}`}>ellones</p>
		</Link>
	);
};

export default LogoFull;
