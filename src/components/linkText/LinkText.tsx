import './LinkText.scss';

type LinkTextProps = {
	text: string;
	type: 'compare' | 'l1s' | 'market' | 'resource' | 'email';
	href: string;
};

const LinkText = (props: LinkTextProps) => {
	const href = props.type === 'email' ? `mailto: ${props.href}` : props.href;

	return (
		<a className={`linkText linkText--${props.type}`} href={href}>
			{props.text}
		</a>
	);
};

export default LinkText;
