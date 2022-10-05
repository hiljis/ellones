import './loader.scss';

type Props = {
	color: 'white' | 'black' | 'primary';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	thickness?: 'thin' | 'md' | 'thick';
	className?: string;
};

const Loader: React.FC<Props> = ({ color, size, className, thickness }) => {
	return (
		<div className={`loaderContainer ${className}`}>
			<div className={`loader loader--${color} ${size} ${thickness}`}></div>
		</div>
	);
};

export default Loader;
