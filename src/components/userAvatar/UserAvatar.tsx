import './UserAvatar.scss';

type Props = {
	username: string;
	imgUrl?: string | null;
	clickHandler?: React.MouseEventHandler<HTMLDivElement>;
};
const UserAvatar: React.FC<Props> = ({ username, imgUrl, clickHandler }) => {
	const firstLetter = username[0].toUpperCase();

	return (
		<div className="userAvatar" onClick={clickHandler}>
			{imgUrl ? <img className="imgAvatar" src={imgUrl} alt="" /> : firstLetter}
		</div>
	);
};

export default UserAvatar;
