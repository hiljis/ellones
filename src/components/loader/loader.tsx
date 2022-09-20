import './loader.scss';

type Props = {
	color: 'white' | 'black' | 'primary';
};

const Loader: React.FC<Props> = ({ color }) => {
	return (
		<div className="loaderContainer">
			<div className={`loader loader--${color}`}></div>
		</div>
	);
};

export default Loader;
