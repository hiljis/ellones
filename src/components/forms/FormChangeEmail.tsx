import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Forms.scss';

type Props = {
	email: string;
};

const initialValues = {
	email: '',
};

const FormChangeEmail: React.FC<Props> = ({ email }) => {
	const initialValues = {
		email: email,
	};
	const instruction = 'No confirm email is sent out, so be sure to type in your own email.';
	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
		}),
		onSubmit: (values, actions) => {
			console.log({ values, actions });
			alert(JSON.stringify(values, null, 2));
			actions.setSubmitting(false);
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
				<button className="form__editUserInfo--submit" type="submit">
					Update
				</button>
			</form>
		</div>
	);
};

export default FormChangeEmail;
