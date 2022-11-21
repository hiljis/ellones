import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserSignIn } from '../../../app/utils/types';
import Loader from '../../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCurrentUser, selectUserStatus, signInEmailStart } from '../../../store/user/userSlice';
import SignInButton from './signInButton/SignInButton';
import './SignInForm.scss';

type SignUpMessage = {
	message: string;
	email: string;
};

const initialValues: UserSignIn = {
	email: '',
	password: '',
};

const SignInForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const userStatus = useAppSelector(selectUserStatus);
	const navigate = useNavigate();
	const location = useLocation();
	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');

	const formik = useFormik({
		initialValues,
		// validate,
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string()
				.max(20, 'Must be 20 characters or less')
				.matches(/^[a-zA-Z0-9]+$/, 'Password can only consist of letters A-Z and numbers')
				.required('Required'),
		}),
		onSubmit: (values, actions) => {
			dispatch(signInEmailStart(values));
		},
	});

	useEffect(() => {
		if (userStatus === 'sign-in-success') {
			navigate('/account');
		}
	}, [userStatus, navigate]);

	useEffect(() => {
		if (location.state) {
			const signUpMessage = location.state as SignUpMessage;
			setMessage(signUpMessage.message);
			setEmail(signUpMessage.email);
			formik.values.email = email;
		} else {
			setMessage('');
			setEmail('');
		}
	}, [location]);

	const invalidEmail = formik.touched.email && formik.errors.email;
	const invalidPassword = formik.touched.password && formik.errors.password;

	return (
		<div className="signInForm__container">
			<form className="signInForm" onSubmit={formik.handleSubmit}>
				<div className="formRow">
					<input
						className={`formField formField--input ${invalidEmail && 'formField--error'}`}
						id="email"
						name="email"
						placeholder="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{invalidEmail ? <div className="errorDot" /> : null}
				</div>

				<div className="formRow">
					<input
						className={`formField formField--input ${invalidPassword && 'formField--error'}`}
						id="password"
						name="password"
						type="password"
						placeholder="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					{invalidPassword ? <div className="errorDot" /> : null}
				</div>

				<SignInButton />
			</form>
			{message ? <p className="signUpMessage">{message}</p> : ''}
		</div>
	);
};

export default SignInForm;
