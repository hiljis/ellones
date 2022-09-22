import './loader.scss';

type Props = {
	color: 'white' | 'black' | 'primary';
	size?: 'sm' | 'md' | 'lg' | 'xl';
};

const Loader: React.FC<Props> = ({ color, size }) => {
	return (
		<div className="loaderContainer">
			<div className={`loader loader--${color} ${size}`}></div>
		</div>
	);
};

export default Loader;
