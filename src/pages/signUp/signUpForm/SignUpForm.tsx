import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { User, UserSignUp } from '../../../app/utils/types';
import Loader from '../../../components/loader/loader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCurrentUser, selectUserStatus, signUpStart } from '../../../store/user/userSlice';
import './SignUpForm.scss';

// const validate = (values: UserSignUp) => {
// 	let errors: Partial<UserSignUp> = {};
// 	if (!values.username) {
// 		errors.username = 'Required';
// 	} else if (!/^[a-zA-Z0-9]+$/i.test(values.username)) {
// 		errors.username = 'Invalid username. Can only consist of letters and numbers';
// 	}

// 	if (!values.email) {
// 		errors.email = 'Required';
// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
// 		errors.email = 'Invalid email address';
// 	}

// 	if (!values.password) {
// 		errors.password = 'Required';
// 	} else if (!/^[a-zA-Z0-9]+$/i.test(values.password)) {
// 		errors.password = 'Invalid password. Can only consist of letters and numbers';
// 	}

// 	if (values.age === '-') {
// 		errors.age = 'Required';
// 	} else if (!/^[0-9]+$/i.test(values.age)) {
// 		errors.age = 'Age must be an integer';
// 	} else if (parseInt(values.age) < 5) {
// 		errors.age = 'This is most likely not your age. Please try again.';
// 	} else if (parseInt(values.age) > 122) {
// 		errors.age = "Congrats your are the oldest person in history! You can't fool us ;)";
// 	}

// 	if (!values.gender) {
// 		errors.gender = 'Required';
// 	}

// 	if (!values.occupation) {
// 		errors.occupation = 'Required';
// 	}

// 	return errors;
// };

const initialValues: UserSignUp = {
	username: '',
	email: '',
	password: '',
	gender: '',
	age: '',
	occupation: '',
};

const SignUpForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const userStatus = useAppSelector(selectUserStatus);
	const navigate = useNavigate();

	useEffect(() => {
		if (userStatus === 'sign-in-success') {
			setTimeout(() => {
				navigate('/account');
				setIsLoading(false);
			}, 1000);
		} else if (userStatus === 'sign-up-success') {
			console.log('SHOW SIGN UP SUCCESS BANNER');
		} else if (userStatus === 'sign-up-failed') {
			setIsLoading(false);
			console.warn('SHOW SIGN UP FAILED BANNER');
		}
	}, [userStatus, navigate]);

	const formik = useFormik({
		initialValues,
		// validate,
		validationSchema: Yup.object({
			username: Yup.string()
				.max(15, 'Must be 15 characters or less')
				.matches(/^[a-zA-Z0-9]+$/, 'Username can only consist of letters A-Z and numbers')
				.required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string()
				.min(8, 'Must be at least 8 characters')
				.max(20, 'Must be 20 characters or less')
				.matches(/^[a-zA-Z0-9]+$/, 'Password can only consist of letters A-Z and numbers')
				.required('Required'),
			gender: Yup.string().required('Required'),
			age: Yup.number()
				.integer('Must be an integer')
				.lessThan(122, 'Invalid age. Must be below 122')
				.moreThan(5, 'Invalid age. User under 5 years old is not allowed.')
				.required('Required'),
			occupation: Yup.string().required('Required'),
		}),
		onSubmit: (values, actions) => {
			setIsLoading(true);
			dispatch(signUpStart(values));
		},
	});

	const invalidUsername = formik.touched.username && formik.errors.username;
	const invalidEmail = formik.touched.email && formik.errors.email;
	const invalidPassword = formik.touched.password && formik.errors.password;
	const invalidGender = formik.touched.gender && formik.errors.gender;
	const invalidAge = formik.touched.age && formik.errors.age;
	const invalidOccupation = formik.touched.occupation && formik.errors.occupation;

	return (
		<div className="signUpForm__container">
			<form className="signUpForm" onSubmit={formik.handleSubmit}>
				<div className="formRow">
					<input
						className={`formField formField--input ${invalidUsername && 'formField--error'}`}
						id="username"
						name="username"
						placeholder="username"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
					/>
					{invalidUsername ? <div className="errorDot" /> : null}
				</div>

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

				<div className="formRow">
					<div className="formCol-1-of-2">
						<select
							className={`formField formField--select ${invalidGender && 'formField--error'}`}
							id="gender"
							name="gender"
							title="Select gender"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.gender}
						>
							<option value="" disabled>
								--gender--
							</option>
							<option value="female">female</option>
							<option value="male">male</option>
							<option value="transgender">transgender</option>
							<option value="non-binary">non-binary</option>
							<option value="other">other</option>
						</select>
						{invalidGender ? <div className="errorDot" /> : null};
					</div>

					<div className="formCol-1-of-2">
						<input
							className={`formField formField--input ${invalidAge && 'formField--error'}`}
							id="age"
							name="age"
							placeholder="age"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.age}
						/>
						{invalidAge ? <div className="errorDot" /> : null};
					</div>
				</div>

				<div className="formRow">
					<select
						className={`formField formField--select ${invalidOccupation && 'formField--error'}`}
						id="occupation"
						name="occupation"
						title="Select occupation"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.occupation}
					>
						<option value="" disabled>
							--occupation--
						</option>
						<option value="employed">employed</option>
						<option value="studying">studying</option>
						<option value="self-employed">self-employed</option>
						<option value="unemployed">unemployed</option>
						<option value="retired">retired</option>
						<option value="other">other</option>
					</select>
					{invalidOccupation ? <div className="errorDot" /> : null}
				</div>

				<button className="btn--submit" type="submit">
					{isLoading ? <Loader color="white" size="sm" /> : 'Sign up'}
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
