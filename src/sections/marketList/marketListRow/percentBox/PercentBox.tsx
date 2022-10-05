import './PercentBox.scss';

type Props = {
	children: number;
	className?: string;
};

const PercentBox: React.FC<Props> = ({ children, className }) => {
	if (children === -100) {
		return <span className={`${className} procentDot procentDot--none`}>{'-'}</span>;
	}

	let colorClass = 'procentDot--neu';
	if (children > 0.5) colorClass = 'procentDot--pos';
	else if (children < -0.5) colorClass = 'procentDot--neg';

	return <span className={`${className} procentDot ${colorClass}`}>{children}%</span>;
};

export default PercentBox;
