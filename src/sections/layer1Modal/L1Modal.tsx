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
		<section className="layer1Modal" onClick={handleClick} ref={ref}>
			{children}
		</section>
	);
};

export default L1Modal;
