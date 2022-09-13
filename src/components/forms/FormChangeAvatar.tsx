import React from 'react';
import './Forms.scss';

type Props = {
	imgUrl: string;
};

const FormChangeAvatar: React.FC<Props> = ({ imgUrl }) => {
	console.log(imgUrl);
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log(e);
	};
	return (
		<div className="formContainer__editUserInfo">
			<h3 className="form__editUserInfo--title">Change Avatar</h3>
			<form className="form__editUserInfo form__editUserInfo--full" onSubmit={handleSubmit}>
				<div className="form__editUserInfo--avatars">
					<option
						className="option__avatar option__avatar--1 option__avatar--active"
						data-avatar="1"
					></option>
					<option className="option__avatar option__avatar--2" data-avatar="2"></option>
					<option className="option__avatar option__avatar--3" data-avatar="3"></option>
					<option className="option__avatar option__avatar--4" data-avatar="4"></option>
				</div>
				<button className="form__editUserInfo--submit" type="submit">
					Update
				</button>
			</form>
		</div>
	);
};

export default FormChangeAvatar;
