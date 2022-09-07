import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import './SignUpForm.scss';

interface MyFormValues {
	username: string;
	email: string;
	password: string;
	gender: '-' | 'male' | 'female' | 'transgender' | 'non-binary' | 'other';
	age: string;
	occupation: '-' | 'employed' | 'studying' | 'self-employed' | 'unemployed' | 'retired' | 'other';
}

const SignUpForm: React.FC = () => {
	const initialValues: MyFormValues = {
		username: '',
		email: '',
		password: '',
		gender: '-',
		age: '',
		occupation: '-',
	};
	return (
		<div className="signUpForm__container">
			<Formik
				initialValues={initialValues}
				validate={(values) => {
					const errors = { username: '', email: '', password: '', gender: '', age: '', occupation: '' };

					if (!values.username) {
						errors.username = 'Required';
					} else if (!/^[A-Z0-9]$/i.test(values.username)) {
						errors.email = 'Invalid username. Can only consist of letters and numbers';
					}

					if (!values.email) {
						errors.email = 'Required';
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address';
					}

					if (!values.password) {
						errors.password = 'Required';
					} else if (!/^[A-Z0-9]$/i.test(values.username)) {
						errors.email = 'Invalid username. Can only consist of letters and numbers';
					}

					if (values.age === '-') {
						errors.age = 'Required';
					} else if (typeof values.age != 'number') {
						errors.age = 'Age must be a number';
					} else if (values.age < 5) {
						errors.age = 'This is most likely not your age. Please try again.';
					} else if (values.age > 122) {
						errors.age = "Congrats your are the oldest person in history! You can't fool us ;)";
					}

					if (!values.gender) {
						errors.gender = 'Required';
					}

					if (!values.occupation) {
						errors.occupation = 'Required';
					}

					return errors;
				}}
				onSubmit={(values, actions) => {
					console.log({ values, actions });
					alert(JSON.stringify(values, null, 2));
					actions.setSubmitting(false);
				}}
			>
				<Form className="signUpForm">
					<Field className="inputField" id="username" name="username" placeholder="username" />

					<Field className="inputField" id="email" name="email" placeholder="email" />

					<Field className="inputField" id="password" name="password" placeholder="password" />

					<div className="formRow">
						<Field className="selectField" as="select" id="gender" name="gender">
							<option value="" selected disabled hidden>
								gender
							</option>
							<option value="female">female</option>
							<option value="male">male</option>
							<option value="transgender">transgender</option>
							<option value="non-binary">non-binary</option>
							<option value="other">other</option>
						</Field>

						<Field className="inputField" id="age" name="age" placeholder="age" />
					</div>

					<Field className="selectField" as="select" id="occupation" name="occupation">
						<option value="" selected disabled hidden>
							occupation
						</option>
						<option value="employed">employed</option>
						<option value="studying">studying</option>
						<option value="self-employed">self-employed</option>
						<option value="unemployed">unemployed</option>
						<option value="retired">retired</option>
						<option value="other">other</option>
					</Field>

					<button className="btn--submit" type="submit">
						Sign Up
					</button>
				</Form>
			</Formik>
		</div>
	);
};

export default SignUpForm;
