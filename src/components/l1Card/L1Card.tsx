import { useState } from 'react';
import Layer1Modal from '../../sections/layer1Modal/L1Modal';
import { getIcon } from '../icons/Icons';
import L1SummaryCard from '../l1SummaryCard/L1SummaryCard';
import './L1Card.scss';

type Props = {
	ticker: string;
	width?: number;
	href?: string;
};

const L1Card: React.FC<Props> = ({ ticker, width, href }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => {
		setModalOpen(true);
	};
	const handleClose = () => {
		setModalOpen(false);
	};
	return (
		<>
			<div className="l1CardContainer" style={{ width: width }} onClick={handleOpen}>
				<a className={`l1Card ${ticker}`} href={href}>
					{ticker}
				</a>
				{getIcon(ticker)}
			</div>
			{modalOpen ? (
				<Layer1Modal closeHandler={handleClose}>
					<L1SummaryCard ticker={ticker} />
				</Layer1Modal>
			) : (
				''
			)}
		</>
		// <StyledL1Card position={position}>{ticker}</StyledL1Card>
	);
};

export default L1Card;
