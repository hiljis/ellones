import React, { useEffect, useState } from 'react';
import {
	AVATAR_COLOR_GREEN,
	AVATAR_COLOR_MAGENTA,
	AVATAR_COLOR_ORANGE,
	AVATAR_COLOR_PURPLE,
	DEFAULT_AVATAR_COLOR,
} from '../../app/utils/consts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	selectAvatarColor,
	selectUpdateStatus,
	setUpdateStatus,
	updateAvatarColorStart,
} from '../../store/user/userSlice';
import './Forms.scss';
import SubmitButton from './submitButton/SubmitButton';

const colors = [
	DEFAULT_AVATAR_COLOR,
	AVATAR_COLOR_GREEN,
	AVATAR_COLOR_MAGENTA,
	AVATAR_COLOR_PURPLE,
	AVATAR_COLOR_ORANGE,
];

const FormChangeAvatarColor: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentAvatarColor = useAppSelector(selectAvatarColor);
	const instruction = 'Change avatar color by clicking one of the selections and then click update';
	const [selectedColor, setSelectedColor] = useState(
		currentAvatarColor === '' ? DEFAULT_AVATAR_COLOR : currentAvatarColor
	);
	const updateStatus = useAppSelector(selectUpdateStatus);

	useEffect(() => {
		return () => {
			dispatch(setUpdateStatus('idle'));
		};
	}, []);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (selectedColor === currentAvatarColor) return;
		dispatch(updateAvatarColorStart(selectedColor));
	};

	const handleSelect = (e: React.SyntheticEvent) => {
		dispatch(setUpdateStatus('idle'));
		const selectColor = e.currentTarget.getAttribute('data-avatar-color');
		if (selectColor) setSelectedColor(selectColor);
	};

	const options = colors.map((color, i) => {
		return (
			<div
				className={`option__color ${selectedColor === color ? 'option__color--active' : ''}`}
				data-avatar-color={color}
				key={i}
				onClick={handleSelect}
				style={{ backgroundColor: color }}
			/>
		);
	});

	return (
		<div className="formContainer__editUserInfo">
			<h3 className="form__editUserInfo--title">Change Avatar Color</h3>
			<p className="form__editUserInfo--instruction">{instruction}</p>
			<form className="form__editUserInfo form__editUserInfo--full" onSubmit={handleSubmit}>
				<div className="form__editUserInfo--avatars">{options}</div>
				<SubmitButton submitStatus={updateStatus} />
			</form>
		</div>
	);
};

export default FormChangeAvatarColor;
