import './OverlayFull.scss';

type Props = {
	children: React.ReactNode;
	color?: string;
	title?: string;
	closeHandler?: Function;
};

const OverlayFull: React.FC<Props> = ({ children, color, title, closeHandler }) => {
	const handleOnClose = () => {
		if (closeHandler) closeHandler();
	};

	return (
		<div className={`overlay overlay--full ${color}`} onClick={handleOnClose}>
			{title ? <h5 className="overlay__title">{title}</h5> : ''}
			{children}
		</div>
	);
};

export default OverlayFull;
