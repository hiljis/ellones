import './StatBox.scss';

type Props = {
	children?: React.ReactNode;
	title: string;
	unit?: string;
	number?: number;
};

const StatBox: React.FC<Props> = ({ children, number, unit, title }) => {
	return (
		<div className="statBox statBox--black">
			{children ? (
				<div className="stat">{children}</div>
			) : (
				<p className="stat">
					<span className="stat--number">{number}</span>
					<span className="stat--unit">{unit}</span>
				</p>
			)}
			<p className="statTitle">{title}</p>
		</div>
	);
};

export default StatBox;
