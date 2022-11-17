import { NavLink } from 'react-router-dom';
import './LinkText.scss';

type Props = {
	children: string;
	type?: 'charts' | 'l1s' | 'market' | 'resource' | 'email' | 'external';
	to: string;
};

const LinkText: React.FC<Props> = ({ children, type, to }) => {
	const href = type === 'email' ? `mailto: ${to}` : to;

	if (to === '') {
		return <div className={`linkText linkText--${type}`}>{children}</div>;
	}

	if (type === 'resource') {
		return (
			<a href={href} className={`linkText linkText--${type}`} target="_blank" rel="noopener noreferrer">
				{children}
			</a>
		);
	}

	return (
		<NavLink to={to} className={`linkText linkText--${type}`}>
			{children}
		</NavLink>
	);
};

export default LinkText;
