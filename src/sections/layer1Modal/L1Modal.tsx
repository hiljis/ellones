import { useRef } from 'react';
import './L1Modal.scss';

type Props = {
	children: React.ReactNode;
	closeHandler: Function;
};

const L1Modal: React.FC<Props> = ({ children, closeHandler }) => {
	const ref = useRef(null);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === ref.current) closeHandler();
	};

	return (
		<div className="layer1Modal" onClick={handleClick} ref={ref}>
			<section className="layer1Modal__content">{children}</section>
		</div>
	);
};

export default L1Modal;
