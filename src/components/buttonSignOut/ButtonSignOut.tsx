import './ButtonSignOut.scss';

const ButtonSignOut: React.FC = () => {
	const handleSignOut = () => {
		try {
			// Firebase Sign out
		} catch (err) {
			console.log('SIGN OUT ERROR: HANDLE IT!');
		}
	};
	return (
		<button className="btn__SignOut" type="button" onClick={handleSignOut}>
			Sign out
		</button>
	);
};

export default ButtonSignOut;
