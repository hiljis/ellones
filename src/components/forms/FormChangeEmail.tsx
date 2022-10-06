import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectEmail, selectUpdateStatus, setUpdateStatus, updateEmailStart } from '../../store/user/userSlice';
import './Forms.scss';
import SubmitButton from './submitButton/SubmitButton';

const FormChangeEmail: React.FC = () => {
	const dispatch = useAppDispatch();
	const updateStatus = useAppSelector(selectUpdateStatus);
	const email = useAppSelector(selectEmail);
	const initialValues = { email: email };

	useEffect(() => {
		return () => {
			dispatch(setUpdateStatus('idle'));
		};
	}, []);

	const instruction = 'No confirm email is sent out, so be sure to type in your own email.';
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
		}),
		onSubmit: (values, actions) => {
			if (values.email !== email) dispatch(updateEmailStart(values.email));
		},
	});
	const invalidEmail = formik.touched.email && formik.errors.email;

	return (
		<div className="formContainer__editUserInfo">
			<h3 className="form__editUserInfo--title">Change Email</h3>
			<p className="form__editUserInfo--instruction">{instruction}</p>
			<form className="form__editUserInfo" onSubmit={formik.handleSubmit}>
				<input
					className={`form__editUserInfo--input ${invalidEmail ? 'invalidInput' : ''}`}
					id="email"
					name="email"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					placeholder="email"
				/>
				<SubmitButton submitStatus={updateStatus} />
			</form>
		</div>
	);
};

export default FormChangeEmail;
