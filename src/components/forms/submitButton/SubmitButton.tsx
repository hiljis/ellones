import Loader from '../../loader/loader';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';
import './SubmitButton.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { setUpdateStatus } from '../../../store/user/userSlice';

const convertStatusToState = (status: string): string => {
	if (
		status === 'updating-fav-chain' ||
		status === 'updating-username' ||
		status === 'updating-email' ||
		status === 'confirming-password' ||
		status === 'updating-password'
	)
		return 'isSubmitting';
	if (
		status === 'update-fav-chain-success' ||
		status === 'update-username-success' ||
		status === 'update-email-success' ||
		status === 'confirm-password-success' ||
		status === 'update-password-success'
	)
		return 'success';
	if (
		status === 'update-fav-chain-failed' ||
		status === 'update-username-failed' ||
		status === 'update-email-failed' ||
		status === 'confirm-password-failed' ||
		status === 'update-password-failed'
	)
		return 'failed';
	return '';
};

type Props = {
	submitStatus: string;
	children?: string;
};

const SubmitButton: React.FC<Props> = ({ submitStatus, children }) => {
	const dispatch = useAppDispatch();
	const [submitState, setSubmitState] = useState('');

	useEffect(() => {
		setSubmitState(convertStatusToState(submitStatus));
	}, [submitStatus]);

	const handleOnFailedClick = () => {
		dispatch(setUpdateStatus('idle'));
	};

	if (submitState === 'failed') {
		return (
			<button className={`submitButton submitButton--failed`} type="button" onClick={handleOnFailedClick}>
				Failed to update
			</button>
		);
	} else if (submitState === 'success') {
		return (
			<div className={`submitButton submitButton--success`}>
				<IconCheck className="icon--xs icon--whiteStroke" />
			</div>
		);
	} else if (submitState === 'isSubmitting') {
		return (
			<div className={`submitButton submitButton--loading`}>
				<Loader color="white" size="xs" thickness="thin" />
			</div>
		);
	} else {
		return (
			<button className={`submitButton`} type="submit">
				{children ? children : 'Update'}
			</button>
		);
	}
};

export default SubmitButton;
