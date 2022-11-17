import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layer1Modal from '../../sections/layer1Modal/L1Modal';
import { getIcon } from '../icons/Icons';
import L1SummaryCard from '../l1SummaryCard/L1SummaryCard';
import './L1Card.scss';

type Props = {
	ticker: string;
	width?: number;
	link: boolean;
};

const L1Card: React.FC<Props> = ({ ticker, width, link }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => {
		setModalOpen(true);
	};
	const handleClose = () => {
		setModalOpen(false);
	};
	const card = link ? (
		<Link className={`l1Card ${ticker}-hover`} to={`/l1s/${ticker}`}>
			{ticker}
		</Link>
	) : (
		<div className={`l1Card ${ticker}-hover`}>{ticker}</div>
	);

	return (
		<>
			<div className="l1CardContainer" onClick={handleOpen}>
				{}
				{card}
				{getIcon(ticker)}
			</div>
			{modalOpen && !link ? (
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
