import React, { useEffect, useState } from 'react';
import StatBox from '../../components/statBox/StatBox';
import './UserAccount.page.scss';
import UserAvatar from '../../components/userAvatar/UserAvatar';
import L1Modal from '../../sections/layer1Modal/L1Modal';
import ButtonSelectEdit from '../../components/buttonEdit/ButtonEdit';
import FormChangeUsername from '../../components/forms/FormChangeUsername';
import FormChangePassword from '../../components/forms/FormChangePassword';
import FormChangeEmail from '../../components/forms/FormChangeEmail';
import FormConfirmPassword from '../../components/forms/FormConfirmPassword';
import FormChangeAvatarColor from '../../components/forms/FormChangeAvatarColor';
import LinkButton from '../../components/linkButton/LinkButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCurrentUser, selectUpdateStatus, selectUserStatus, setUpdateStatus } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import FormChangeFavChain from '../../components/forms/FormChangeFavChain';
import FavChainBox from './favChainBox/FavChainBox';

export interface IUser {
	username: string;
	email: string;
	imgUrl: string;
	password: string;
}

const UserAccountPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedForm, setSelectedForm] = useState<string>('');
	const [passwordConfirmed, setPasswordConfirmed] = useState(false);
	const updateStatus = useAppSelector(selectUpdateStatus);

	const currentUser = useAppSelector(selectCurrentUser);
	const userStatus = useAppSelector(selectUserStatus);
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser || userStatus === 'no-user') {
			navigate('/');
		}
	}, [currentUser, userStatus, navigate]);

	useEffect(() => {
		if (updateStatus === 'confirm-password-success' && selectedForm === 'password') {
			setTimeout(() => {
				setPasswordConfirmed(true);
			}, 1000);
		} else if (selectedForm !== 'password') {
			setPasswordConfirmed(false);
		} else if (updateStatus === 'update-password-success') {
			setTimeout(() => {
				setModalOpen(false);
				setPasswordConfirmed(false);
			}, 2000);
		}
	}, [updateStatus, selectedForm]);

	if (!currentUser || userStatus === 'no-user') return <></>;

	const handleSelect = (selected: string) => {
		setModalOpen(true);
		setSelectedForm(selected);
	};

	const closeModalHandler = () => {
		setModalOpen(false);
	};

	let form;
	if (selectedForm === 'username') form = <FormChangeUsername />;
	if (selectedForm === 'password') form = <FormConfirmPassword />;
	if (selectedForm === 'password' && passwordConfirmed) form = <FormChangePassword />;
	if (selectedForm === 'email') form = <FormChangeEmail />;
	if (selectedForm === 'avatar') form = <FormChangeAvatarColor />;
	if (selectedForm === 'favChain') form = <FormChangeFavChain />;

	return (
		<main className="userAccountPage">
			<section className="userAccountPage--left">
				<div className="user__stats">
					<StatBox title="Subscription" unit="Free" />
					<StatBox title="&#10084;&#65039;" number={24} />
					<FavChainBox onClickHandler={() => handleSelect('favChain')} />
				</div>
				<div className="userInfo">
					<h3 className="userInfo__title">Email</h3>
					<p className="userInfo__currentValue userInfo__currentValue--left">
						{currentUser.email}
						<span className="userInfo__selectBtn">
							<ButtonSelectEdit title="Edit Password" clickHandler={() => handleSelect('email')} />
						</span>
					</p>
				</div>
				<div className="userInfo">
					<h3 className="userInfo__title">Change password</h3>
					<p className="userInfo__currentValue userInfo__currentValue--left">
						{'********'}
						<span className="userInfo__selectBtn">
							<ButtonSelectEdit title="Edit Password" clickHandler={() => handleSelect('password')} />
						</span>
					</p>
				</div>
			</section>
			<section className="userAccountPage--right">
				<div className="user__selectAvatar" onClick={() => handleSelect('avatar')}>
					<UserAvatar username={currentUser.username!} clickHandler={() => handleSelect('avatar')} />
				</div>
				<div className="userInfo">
					<p className="userInfo__currentValue">
						{currentUser.username!}
						<span className="userInfo__selectBtn">
							<ButtonSelectEdit title="Edit Username" clickHandler={() => handleSelect('username')} />
						</span>
					</p>
				</div>
				<LinkButton to="/signout">Sign out</LinkButton>
			</section>
			{modalOpen && <L1Modal closeHandler={closeModalHandler}>{form}</L1Modal>}
		</main>
	);
};

export default UserAccountPage;
