import { useState } from 'react';
import LogoSelectorGrid from '../../../../../components/logoSelectorGrid/LogoSelectorGrid';
import OverlayFull from '../../../../../components/overlayFull/OverlayFull';
import { changeTicker, selectTicker } from '../../../../../store/historyMatrix/historyMatrix.slice';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import './TickerPicker.scss';

const TickerPicker: React.FC = () => {
	const selectedTicker = useAppSelector(selectTicker);
	const dispatch = useAppDispatch();
	const [modalOpen, setModalOpen] = useState(false);

	function handleOnClick() {
		setModalOpen(true);
	}

	const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
		const ticker = e.currentTarget.dataset.ticker;
		if (ticker) dispatch(changeTicker(ticker));
		setModalOpen(false);
	};
	return (
		<td className="tickerPicker">
			<button className="tickerPickerButton" type="button" onClick={handleOnClick}>
				{selectedTicker}
			</button>
			{modalOpen ? (
				<OverlayFull>
					<div className="selectorGridContainer">
						<LogoSelectorGrid selectorHandler={handleSelect} selected={selectedTicker} />
					</div>
				</OverlayFull>
			) : (
				''
			)}
		</td>
	);
};

export default TickerPicker;
