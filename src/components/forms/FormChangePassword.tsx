import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Forms.scss';

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
	const instruction = 'At least 8 characters. No whitespaces.';
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			password: Yup.string()
				.min(8, 'Passwords must be longer than 8 characters.')
				.matches(/\s/g, 'Passwords can not have any whitespaces')
				.required('Required'),
		}),
		onSubmit: (values, actions) => {
			console.log({ values, actions });
			alert(JSON.stringify(values, null, 2));
			actions.setSubmitting(false);
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
				<button className="form__editUserInfo--submit" type="submit">
					Update
				</button>
			</form>
		</div>
	);
};

export default FormChangePassword;
