import { setMilliseconds } from 'date-fns/esm';
import { useEffect, useState } from 'react';
import { getIcon } from '../../../components/icons/Icons';
import Loader from '../../../components/loader/loader';
import StatBox from '../../../components/statBox/StatBox';
import { useAppSelector } from '../../../store/hooks';
import { selectFavChain, selectUpdateStatus } from '../../../store/user/userSlice';
import './FavChainBox.scss';

type Props = {
	onClickHandler: React.MouseEventHandler<HTMLDivElement>;
};

const FavChainBox: React.FC<Props> = ({ onClickHandler }) => {
	const favChain = useAppSelector(selectFavChain);
	const updateStatus = useAppSelector(selectUpdateStatus);
	const [icon, setIcon] = useState(<></>);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (updateStatus === 'updating-fav-chain') setIsLoading(true);
		else setIsLoading(false);
	}, [updateStatus]);

	useEffect(() => {
		setIcon(getIcon(favChain, 'icon--sm icon--black'));
	}, [favChain]);

	if (isLoading) {
		return (
			<StatBox title="Favorite Chain">
				<Loader color="black" size="sm" thickness="thin" />
			</StatBox>
		);
	}

	return (
		<div className="statBoxClickable" onClick={onClickHandler}>
			<StatBox title="Favorite Chain">{icon}</StatBox>
		</div>
	);
};

export default FavChainBox;
