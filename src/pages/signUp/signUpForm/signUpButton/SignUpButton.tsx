import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { resetUserStatus, selectUserStatus } from '../../../../store/user/userSlice';
import './SignUpButton.scss';

const SignUpButton: React.FC = () => {
	const userStatus = useAppSelector(selectUserStatus);
	const dispatch = useAppDispatch();

	if (userStatus === 'signing-up') {
		return (
			<div className="btn__signup">
				<Loader color="white" size="sm" />
			</div>
		);
	}

	if (userStatus === 'sign-up-success') {
		return (
			<div className="btn__signup btn__signup--success">
				<Loader color="white" size="sm" />
			</div>
		);
	}

	const handleResetUserStatus = () => {
		dispatch(resetUserStatus());
	};

	if (userStatus === 'sign-up-failed') {
		return (
			<button className="btn__signup btn__signup--failed" type="button" onClick={handleResetUserStatus}>
				Failed to sign up
			</button>
		);
	}

	return (
		<button className="btn__signup" type="submit">
			Sign up
		</button>
	);
};

export default SignUpButton;
