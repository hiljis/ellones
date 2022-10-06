import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { confirmPasswordStart, selectUpdateStatus, setUpdateStatus } from '../../store/user/userSlice';
import './Forms.scss';
import SubmitButton from './submitButton/SubmitButton';

const initialValues = {
	confirmPassword: '',
};

const FormConfirmPassword: React.FC = () => {
	const dispatch = useAppDispatch();
	const updateStatus = useAppSelector(selectUpdateStatus);

	useEffect(() => {
		return () => {
			dispatch(setUpdateStatus('idle'));
		};
	}, []);

	const instruction = 'Type in and submit your existing password.';
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			confirmPassword: Yup.string().required('Required'),
		}),
		onSubmit: (values, actions) => {
			dispatch(confirmPasswordStart(values.confirmPassword));
		},
	});
	const invalidPassword = formik.touched.confirmPassword && formik.errors.confirmPassword;

	return (
		<div className="formContainer__editUserInfo">
			<h3 className="form__editUserInfo--title">Confirm Password</h3>
			<p className="form__editUserInfo--instruction">{instruction}</p>
			<form className="form__editUserInfo" onSubmit={formik.handleSubmit}>
				<input
					className={`form__editUserInfo--input ${invalidPassword ? 'invalidInput' : ''}`}
					placeholder="confirm password"
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.confirmPassword}
				/>
				<SubmitButton submitStatus={updateStatus}>Confirm</SubmitButton>
			</form>
		</div>
	);
};

export default FormConfirmPassword;
