import './StatBox.scss';

type Props = {
	title: string;
	unit?: string;
	number?: number;
};

const StatBox: React.FC<Props> = (props) => {
	return (
		<div className="statBox statBox--black">
			<p className="stat">
				<span className="stat--number">{props.number}</span>
				<span className="stat--unit">{props.unit}</span>
			</p>
			<p className="statTitle">{props.title}</p>
		</div>
	);
};

export default StatBox;
