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
import FormChangeAvatar from '../../components/forms/FormChangeAvatar';
import StatBoxDropDown from '../../components/statBoxDropdown/StatBoxDropdown';
import LinkButton from '../../components/linkButton/LinkButton';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser, selectUserStatus } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

export interface IUser {
	username: string;
	email: string;
	imgUrl: string;
	password: string;
}

const UserAccountPage: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedForm, setSelectedForm] = useState<string>('');
	const [passwordConfirmed, setPasswordConfirmed] = useState(false);

	const currentUser = useAppSelector(selectCurrentUser);
	const userStatus = useAppSelector(selectUserStatus);
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser || userStatus === 'no-user') {
			navigate('/');
		}
	}, [currentUser, userStatus, navigate]);

	if (!currentUser || userStatus === 'no-user') return <></>;

	const handleSelect = (selected: string) => {
		setModalOpen(true);
		setSelectedForm(selected);
	};

	const closeModalHandler = () => {
		setModalOpen(false);
	};

	let form;
	if (selectedForm === 'username') form = <FormChangeUsername username={currentUser.username!} />;
	if (selectedForm === 'password') form = <FormConfirmPassword />;
	if (selectedForm === 'password' && passwordConfirmed) form = <FormChangePassword />;
	if (selectedForm === 'email') form = <FormChangeEmail email={currentUser.email} />;
	if (selectedForm === 'avatar') form = <FormChangeAvatar />;

	return (
		<main className="userAccountPage">
			<section className="userAccountPage--left">
				<div className="user__stats">
					<StatBox title="Subscription" unit="Free" />
					<StatBox title="&#10084;&#65039;" number={24} />
					<StatBoxDropDown title="Favorite chain" target="l1s" />
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
