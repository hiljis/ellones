import { useEffect, useState } from 'react';
import { TickerStatus } from '../../../app/utils/types';
import { getIcon } from '../../../components/icons/Icons';
import LogoSelectorGrid from '../../../components/logoSelectorGrid/LogoSelectorGrid';
import OverlayFull from '../../../components/overlayFull/OverlayFull';
import { changeChartTicker } from '../../../store/charts/charts.slice';
import { useAppDispatch } from '../../../store/hooks';
import './SelectTickerBtn.scss';

type Props = {
	ticker: string;
	loadStatus: TickerStatus;
	index: number;
};

const SelectTickerBtn: React.FC<Props> = ({ ticker, index, loadStatus }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [icon, setIcon] = useState(<>---</>);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!ticker) setIcon(<>---</>);
		else if (loadStatus === 'load-failed') setIcon(getIcon(ticker, 'icon--sm icon--warning'));
		else if (loadStatus === 'load-success') setIcon(getIcon(ticker, 'icon--sm icon--white'));
		else setIcon(getIcon(ticker, 'icon--sm icon--primary'));
	}, [ticker, loadStatus]);

	const openModal = () => {
		setModalOpen(true);
	};

	const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
		const ticker = e.currentTarget.dataset.ticker;
		if (ticker) dispatch(changeChartTicker({ ticker: ticker, index: index }));
		setModalOpen(false);
	};

	return (
		<div className="selectTickerContainer">
			<div className={`selectTickerBtn ${loadStatus} ${ticker}`} onClick={openModal}>
				{icon}
			</div>
			{modalOpen ? (
				<OverlayFull>
					<div className="selectorGridContainer">
						<LogoSelectorGrid selectorHandler={handleSelect} selected={ticker} />
					</div>
				</OverlayFull>
			) : (
				''
			)}
		</div>
	);
};

export default SelectTickerBtn;
