import { Link } from 'react-router-dom';
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
		<Link to="/signout" className="btn__SignOut" type="button" onClick={handleSignOut}>
			Sign out
		</Link>
	);
};

export default ButtonSignOut;
