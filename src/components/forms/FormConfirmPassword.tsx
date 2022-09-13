import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Forms.scss';

const initialValues = {
	confirmPassword: '',
};

const FormConfirmPassword: React.FC = () => {
	const instruction = 'Type in and submit your existing password.';
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			confirmPassword: Yup.string()
				.min(8, 'Password cannot be shorter than 8 characters.')
				.matches(/\s/g, 'Password does not have any whitespaces')
				.required('Required'),
		}),
		onSubmit: (values, actions) => {
			console.log({ values, actions });
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
				<button className="form__editUserInfo--submit" type="submit">
					Confirm
				</button>
			</form>
		</div>
	);
};

export default FormConfirmPassword;
