import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser, selectUserStatus, signOutStart } from '../../store/user/userSlice';
import './SignOut.page.scss';

const SignOutPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);
	const navigate = useNavigate();
	const userStatus = useAppSelector(selectUserStatus);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (userStatus === 'no-user') {
			navigate('/');
		} else if (userStatus === 'sign-out-failed') {
			// TODO Dislay message
			navigate('/');
		} else {
			dispatch(signOutStart());
		}
	}, [navigate, dispatch, userStatus]);

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
