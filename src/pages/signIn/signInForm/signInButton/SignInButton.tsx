import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { resetUserStatus, selectUserStatus } from '../../../../store/user/userSlice';
import './SignInButton.scss';

const SignInButton: React.FC = () => {
	const userStatus = useAppSelector(selectUserStatus);
	const dispatch = useAppDispatch();

	const handleResetUserStatus = () => {
		dispatch(resetUserStatus());
	};

	if (userStatus === 'signing-in') {
		return (
			<div className="btn__signin btn__signin--loading">
				<Loader color="white" size="sm" />
			</div>
		);
	}

	if (userStatus === 'sign-in-success') {
		return (
			<div className="btn__signin btn__signin--success">
				<Loader color="white" size="sm" />
			</div>
		);
	}

	if (userStatus === 'sign-in-failed') {
		return (
			<div className="btn__signin btn__signin--failed" onClick={handleResetUserStatus}>
				Failed to sign in
			</div>
		);
	}

	return (
		<button className="btn__signin" type="submit">
			Sign in
		</button>
	);
};

export default SignInButton;
