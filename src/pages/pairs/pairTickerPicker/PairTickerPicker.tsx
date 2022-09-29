import { useState } from 'react';
import { getIcon } from '../../../components/icons/Icons';
import LogoSelectorGrid from '../../../components/logoSelectorGrid/LogoSelectorGrid';
import OverlayFull from '../../../components/overlayFull/OverlayFull';
import './PairTickerPicker.scss';

type Props = {
	selectedTicker: string;
	selectHandler: Function;
	isNumerator: boolean;
};

const PairTickerPicker: React.FC<Props> = ({ selectedTicker, selectHandler, isNumerator }) => {
	const [modalOpen, setModalOpen] = useState(false);

	function handleOnClick() {
		setModalOpen(true);
	}

	const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
		const ticker = e.currentTarget.dataset.ticker;
		if (ticker) selectHandler(ticker);
		setModalOpen(false);
	};

	let button;
	if (selectedTicker) {
		button = (
			<button
				className={`pairTickerPickerButton ${isNumerator ? 'numerator' : 'denominator'}`}
				type="button"
				onClick={handleOnClick}
			>
				{getIcon(selectedTicker, 'icon--sm icon--white')}
			</button>
		);
	} else {
		button = (
			<button
				className={`pairTickerPickerButton empty ${isNumerator ? 'numerator' : 'denominator'}`}
				type="button"
				onClick={handleOnClick}
				title={`Add ${isNumerator ? 'Numerator' : 'Denominator'}`}
			>
				<span className="empty__dot" />
				<span className="empty__dot" />
				<span className="empty__dot" />
			</button>
		);
	}

	return (
		<div className="pairTickerPicker">
			{button}
			{modalOpen ? (
				<OverlayFull
					color={isNumerator ? 'primary' : 'secondary'}
					title={isNumerator ? 'Numerator' : 'Denominator'}
				>
					<div className="selectorGridContainer">
						<LogoSelectorGrid
							selectorHandler={handleSelect}
							selected={selectedTicker}
							color={isNumerator ? 'primary' : 'secondary'}
						/>
					</div>
				</OverlayFull>
			) : (
				''
			)}
		</div>
	);
};

export default PairTickerPicker;
