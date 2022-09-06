import './L1Card.scss';
import { StyledL1Card } from './StyledL1Card';

type Props = {
	ticker: string;
	width: number;
};

const L1Card: React.FC<Props> = ({ ticker, width }) => {
	return (
		<div className="l1CardContainer" style={{ width: width }}>
			<a className={`l1Card ${ticker}`} href="#">
				{ticker}
			</a>
		</div>
		// <StyledL1Card position={position}>{ticker}</StyledL1Card>
	);
};

export default L1Card;
