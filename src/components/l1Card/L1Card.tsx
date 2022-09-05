import './L1Card.scss';

type l1CardProps = {
	ticker: string;
};

const L1Card = (props: l1CardProps) => {
	return (
		<a className={`l1Card ${props.ticker}`} href="#">
			{props.ticker}
		</a>
	);
};

export default L1Card;
