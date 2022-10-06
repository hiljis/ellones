import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTickers } from '../../store/profiles/profilesSlice';
import {
	selectFavChain,
	selectUpdateStatus,
	selectUserStatus,
	setUpdateStatus,
	updateFavChainStart,
} from '../../store/user/userSlice';
import { getIcon } from '../icons/Icons';
import './Forms.scss';
import SubmitButton from './submitButton/SubmitButton';

const FormChangeFavChain: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentFavChain = useAppSelector(selectFavChain);
	const tickers = useAppSelector(selectTickers);
	const instruction = 'Change favorite chain by clicking one of the selections and then click update';
	const [selectedTicker, setSelectedTicker] = useState(currentFavChain);
	const updateStatus = useAppSelector(selectUpdateStatus);

	useEffect(() => {
		return () => {
			dispatch(setUpdateStatus('idle'));
		};
	}, []);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(updateFavChainStart(selectedTicker));
	};

	const handleSelect = (e: React.SyntheticEvent) => {
		const selectTicker = e.currentTarget.getAttribute('data-chain');
		if (selectTicker) setSelectedTicker(selectTicker);
	};

	const options = tickers.map((ticker, i) => {
		return (
			<div
				className={`option__ticker ${selectedTicker === ticker ? 'option__ticker--active' : ''}`}
				data-chain={ticker}
				key={i}
				onClick={handleSelect}
			>
				{getIcon(ticker, `icon--sm icon--black ${selectedTicker === ticker ? 'icon--white' : 'icon--black'}`)}
			</div>
		);
	});

	return (
		<div className="formContainer__editUserInfo">
			<h3 className="form__editUserInfo--title">Change Favorite Chain</h3>
			<p className="form__editUserInfo--instruction">{instruction}</p>
			<form className="form__editUserInfo form__editUserInfo--full" onSubmit={handleSubmit}>
				<div className="form__editUserInfo--tickers">{options}</div>
				<SubmitButton submitStatus={updateStatus} />
			</form>
		</div>
	);
};

export default FormChangeFavChain;
