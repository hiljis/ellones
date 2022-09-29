import './OverlayFull.scss';

type Props = {
	children: React.ReactNode;
	color?: string;
	title?: string;
};

const OverlayFull: React.FC<Props> = ({ children, color, title }) => {
	return (
		<div className={`overlay overlay--full ${color}`}>
			{title ? <h5 className="overlay__title">{title}</h5> : ''}
			{children}
		</div>
	);
};

export default OverlayFull;
