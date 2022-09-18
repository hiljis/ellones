import { Link } from 'react-router-dom';
import './LinkButton.scss';

type Props = {
	text: string;
	href: string;
	style: string;
};

const LinkButton: React.FC<Props> = (props) => {
	return (
		<Link className={`linkButton linkButton--${props.style}`} to={props.href}>
			{props.text}
		</Link>
	);
};

export default LinkButton;
