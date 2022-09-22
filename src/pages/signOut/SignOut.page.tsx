import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser, signOutStart } from '../../store/user/userSlice';
import './SignOut.page.scss';

const SignOutPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (!currentUser) {
			navigate('/');
		} else {
			setTimeout(() => {
				dispatch(signOutStart());
			}, 3000);
		}
	}, [currentUser, navigate, dispatch]);

	return (
		<main className="signOutPage">
			<h1 className="signOutHeader">Signing Out</h1>
			<div className="colorSpectrum-animated">
				<div className="colorSpectrum--color purple" />
				<div className="colorSpectrum--color blue" />
				<div className="colorSpectrum--color green" />
				<div className="colorSpectrum--color yellow" />
				<div className="colorSpectrum--color orange" />
				<div className="colorSpectrum--color red" />
			</div>
		</main>
	);
};

export default SignOutPage;
