import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Forms.scss';

type Props = {
	username: string;
};

const initialValues = {
	username: '',
};

const FormChangeUsername: React.FC<Props> = ({ username }) => {
	const initialValues = {
		username: username,
	};
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
			console.log({ values, actions });
			alert(JSON.stringify(values, null, 2));
			actions.setSubmitting(false);
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
				<button className="form__editUserInfo--submit" type="submit">
					Update
				</button>
			</form>
		</div>
	);
};

export default FormChangeUsername;
