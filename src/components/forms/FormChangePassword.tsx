import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUpdateStatus, setUpdateStatus, updatePasswordStart } from '../../store/user/userSlice';
import './Forms.scss';
import SubmitButton from './submitButton/SubmitButton';

const confirmPassword = (password: string) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (password === 'abc123') resolve(true);
			else reject('ERROR');
		}, 1000);
	});
};

const initialValues = {
	password: '',
};

const FormChangePassword: React.FC = () => {
	const dispatch = useAppDispatch();
	const updateStatus = useAppSelector(selectUpdateStatus);

	useEffect(() => {
		return () => {
			dispatch(setUpdateStatus('idle'));
		};
	}, []);

	const instruction = 'At least 8 characters. No whitespaces.';
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			password: Yup.string()
				.min(8, 'Must be at least 8 characters.')
				.max(20, 'Must be 20 characters or less')
				.matches(/^[a-zA-Z0-9]+$/, 'Password can only consist of letters A-Z and numbers')
				.required('Required'),
		}),
		onSubmit: (values, actions) => {
			dispatch(updatePasswordStart(values.password));
		},
	});
	const invalidPassword = formik.touched.password && formik.errors.password;

	return (
		<div className="formContainer__editUserInfo">
			<h3 className="form__editUserInfo--title">Change Password</h3>
			<p className="form__editUserInfo--instruction">{instruction}</p>
			<form className="form__editUserInfo" onSubmit={formik.handleSubmit}>
				<input
					className={`form__editUserInfo--input ${invalidPassword ? 'invalidInput' : ''}`}
					placeholder="new password"
					type="password"
					id="password"
					name="password"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>
				<SubmitButton submitStatus={updateStatus} />
			</form>
		</div>
	);
};

export default FormChangePassword;
