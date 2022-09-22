import { Link } from 'react-router-dom';
import './LinkButton.scss';

type Props = {
	children: string;
	to: string;
	type?: string;
};

const LinkButton: React.FC<Props> = ({ children, to, type }) => {
	return (
		<Link className={`linkButton linkButton--${type}`} to={to}>
			{children}
		</Link>
	);
};

export default LinkButton;
