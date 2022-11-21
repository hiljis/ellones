import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { resetUserStatus } from '../../store/user/userSlice';
import './SignIn.page.scss';
import SignInForm from './signInForm/SignInForm';

const SignInPage: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(resetUserStatus());
	}, []);

	return (
		<main className="signInPage">
			<div className="signInLeft">
				<h1 className="signInHeader">Sign in</h1>
				<div className="colorSpectrum">
					<div className="colorSpectrum--color purple" />
					<div className="colorSpectrum--color blue" />
					<div className="colorSpectrum--color green" />
					<div className="colorSpectrum--color yellow" />
					<div className="colorSpectrum--color orange" />
					<div className="colorSpectrum--color red" />
				</div>
				<p>
					Don't have an account? <NavLink to="/signup">Sign up</NavLink>
				</p>
			</div>
			<SignInForm />
		</main>
	);
};

export default SignInPage;
