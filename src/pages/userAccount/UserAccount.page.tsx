import React, { useState } from 'react';
import StatBox from '../../components/statBox/StatBox';
import './UserAccount.page.scss';
import ButtonSignOut from '../../components/buttonSignOut/ButtonSignOut';
import UserAvatar from '../../components/userAvatar/UserAvatar';
import L1Modal from '../../sections/layer1Modal/L1Modal';
import ButtonSelectEdit from '../../components/buttonEdit/ButtonEdit';
import FormChangeUsername from '../../components/forms/FormChangeUsername';
import FormChangePassword from '../../components/forms/FormChangePassword';
import FormChangeEmail from '../../components/forms/FormChangeEmail';
import FormConfirmPassword from '../../components/forms/FormConfirmPassword';
import FormChangeAvatar from '../../components/forms/FormChangeAvatar';
import StatBoxDropDown from '../../components/statBoxDropdown/StatBoxDropdown';

export interface IUser {
	username: string;
	email: string;
	imgUrl: string;
	password: string;
}

const user: IUser = {
	username: 'Henke',
	email: 'henric.hiljanen@gmail.com',
	imgUrl: '',
	password: '',
};

const UserAccountPage: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedForm, setSelectedForm] = useState<string>('');
	const [passwordConfirmed, setPasswordConfirmed] = useState(false);

	const handleSelect = (selected: string) => {
		setModalOpen(true);
		setSelectedForm(selected);
	};

	const closeModalHandler = () => {
		setModalOpen(false);
	};

	let form;
	if (selectedForm === 'username') form = <FormChangeUsername username={user.username} />;
	if (selectedForm === 'password') form = <FormConfirmPassword />;
	if (selectedForm === 'password' && passwordConfirmed) form = <FormChangePassword />;
	if (selectedForm === 'email') form = <FormChangeEmail email={user.email} />;
	if (selectedForm === 'avatar') form = <FormChangeAvatar imgUrl={user.imgUrl} />;

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
						{user.email}
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
					<UserAvatar
						username={user.username}
						imgUrl={user.imgUrl}
						clickHandler={() => handleSelect('avatar')}
					/>
				</div>
				<div className="userInfo">
					<p className="userInfo__currentValue">
						{user.username}
						<span className="userInfo__selectBtn">
							<ButtonSelectEdit title="Edit Username" clickHandler={() => handleSelect('username')} />
						</span>
					</p>
				</div>
				<ButtonSignOut />
			</section>
			{modalOpen && <L1Modal closeHandler={closeModalHandler}>{form}</L1Modal>}
		</main>
	);
};

export default UserAccountPage;
