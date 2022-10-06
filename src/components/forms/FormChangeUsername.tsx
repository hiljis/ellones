import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUpdateStatus, selectUsername, setUpdateStatus, updateUsernameStart } from '../../store/user/userSlice';
import './Forms.scss';
import SubmitButton from './submitButton/SubmitButton';

const FormChangeUsername: React.FC = () => {
	const dispatch = useAppDispatch();
	const updateStatus = useAppSelector(selectUpdateStatus);
	const username = useAppSelector(selectUsername);
	const initialValues = { username: username };
	
	useEffect(() => {
		return () => {
			dispatch(setUpdateStatus('idle'));
		};
	}, []);
	
	const instruction = 'At least 5 characters. Only letters and numbers. No whitespaces.';
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			username: Yup.string()
				.min(5, 'Username must be longer than 5 characters')
				.matches(/^[a-zA-Z0-9]+$/, 'Username can only consist of letters and numbers')
				.required('Required'),
		}),
		onSubmit: (values, actions) => {
			if (values.username !== username) dispatch(updateUsernameStart(values.username));
		},
	});
	const invalidUsername = formik.touched.username && formik.errors.username;

	return (
		<div className="formContainer__editUserInfo">
			<h3 className="form__editUserInfo--title">Change Username</h3>
			<p className="form__editUserInfo--instruction">{instruction}</p>
			<form className="form__editUserInfo" onSubmit={formik.handleSubmit}>
				<input
					className={`form__editUserInfo--input ${invalidUsername ? 'invalidInput' : ''}`}
					placeholder="username"
					type="text"
					id="username"
					name="username"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
				/>
				<SubmitButton submitStatus={updateStatus} />
			</form>
		</div>
	);
};

export default FormChangeUsername;
