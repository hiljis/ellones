import { NavLink } from 'react-router-dom';
import './LinkText.scss';

type LinkTextProps = {
	children: string;
	type: 'compare' | 'l1s' | 'market' | 'resource' | 'email' | 'external';
	href: string;
};

const LinkText = (props: LinkTextProps) => {
	const href = props.type === 'email' ? `mailto: ${props.href}` : props.href;

	if (props.type === 'resource') {
		return (
			<a href={href} className={`linkText linkText--${props.type}`} target="_blank" rel="noopener noreferrer">
				{props.children}
			</a>
		);
	}

	return (
		<NavLink to={href} className={`linkText linkText--${props.type}`}>
			{props.children}
		</NavLink>
	);
};

export default LinkText;
