import './loader.scss';

type Props = {
	color: 'white' | 'black' | 'primary';
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
};

const Loader: React.FC<Props> = ({ color, size, className }) => {
	return (
		<div className={`loaderContainer ${className}`}>
			<div className={`loader loader--${color} ${size}`}></div>
		</div>
	);
};

export default Loader;
