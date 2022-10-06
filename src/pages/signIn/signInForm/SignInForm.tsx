import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserSignIn } from '../../../app/utils/types';
import Loader from '../../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCurrentUser, selectUserStatus, signInEmailStart } from '../../../store/user/userSlice';
import './SignInForm.scss';

const initialValues: UserSignIn = {
	email: '',
	password: '',
};

const SignInForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);
	const userStatus = useAppSelector(selectUserStatus);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate('/account');
		}
	}, [currentUser]);

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
			try {
				actions.setSubmitting(true);
				dispatch(signInEmailStart(values));
			} catch (err) {
				console.error('SIGN IN FAILED');
			} finally {
				setTimeout(() => {
					actions.setSubmitting(false);
				}, 2000);
			}
		},
	});

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

				<button className="btn--submit" type="submit">
					{userStatus === 'signing-in' ? <Loader color="white" size="sm" /> : 'Sign in'}
				</button>
			</form>
		</div>
	);
};

export default SignInForm;
