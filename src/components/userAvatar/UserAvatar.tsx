import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectAvatarColor, selectCurrentUser, selectUserStatus } from '../../store/user/userSlice';
import Loader from '../loader/loader';
import './UserAvatar.scss';

type Props = {
	username: string;
	imgUrl?: string | null;
	clickHandler?: React.MouseEventHandler<HTMLDivElement>;
};
const UserAvatar: React.FC<Props> = ({ username, imgUrl, clickHandler }) => {
	const user = useAppSelector(selectCurrentUser);

	if (user) {
		return (
			<div className="userAvatar" onClick={clickHandler} style={{ backgroundColor: user.avatarColor }}>
				{imgUrl ? <img className="imgAvatar" src={imgUrl} alt="" /> : user.username[0].toUpperCase()}
			</div>
		);
	}

	return (
		<div className="userAvatar">
			<Loader color="white" size="md" />
		</div>
	);
};

export default UserAvatar;
