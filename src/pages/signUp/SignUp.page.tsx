import './SignUp.page.scss';
import SignUpForm from './signUpForm/SignUpForm';

const SignUpPage: React.FC = () => {
	return (
		<main className="signUpPage">
			<div className="signUpLeft">
				<h1 className="signUpHeader">Sign Up</h1>
				<div className="colorSpectrum">
					<div className="colorSpectrum--color purple" />
					<div className="colorSpectrum--color blue" />
					<div className="colorSpectrum--color green" />
					<div className="colorSpectrum--color yellow" />
					<div className="colorSpectrum--color orange" />
					<div className="colorSpectrum--color red" />
				</div>
			</div>
			<SignUpForm />
		</main>
	);
};

export default SignUpPage;
