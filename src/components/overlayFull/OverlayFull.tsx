import './OverlayFull.scss';

type Props = {
	children: React.ReactNode;
};

const OverlayFull: React.FC<Props> = ({ children }) => {
	return <div className="overlay overlay--full">{children}</div>;
};

export default OverlayFull;
