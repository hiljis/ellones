import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/user/userSlice';
import './SignUp.page.scss';
import SignUpForm from './signUpForm/SignUpForm';

const SignUpPage: React.FC = () => {
	const currentUser = useAppSelector(selectCurrentUser);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (currentUser) {
			navigate('/account');
		}
	}, [currentUser, navigate]);
	return (
		<main className="signUpPage">
			<div className="signUpLeft">
				<h1 className="signUpHeader">Sign up</h1>
				<div className="colorSpectrum">
					<div className="colorSpectrum--color purple" />
					<div className="colorSpectrum--color blue" />
					<div className="colorSpectrum--color green" />
					<div className="colorSpectrum--color yellow" />
					<div className="colorSpectrum--color orange" />
					<div className="colorSpectrum--color red" />
				</div>
				<p>
					Already have an account? <NavLink to="/signin">Sign in</NavLink>
				</p>
			</div>
			<SignUpForm />
		</main>
	);
};

export default SignUpPage;
