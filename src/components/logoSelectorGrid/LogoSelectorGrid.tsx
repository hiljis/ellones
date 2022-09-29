import { getEffectiveConstraintOfTypeParameter } from 'typescript';
import { useAppSelector } from '../../store/hooks';
import { selectTickers } from '../../store/profiles/profilesSlice';
import { getIcon } from '../icons/Icons';
import './LogoSelectorGrid.scss';

type Props = {
	selectorHandler: React.MouseEventHandler<HTMLElement>;
	selected: string;
	color?: string;
};

const LogoSelectorGrid: React.FC<Props> = ({ selectorHandler, selected, color }) => {
	const tickers = useAppSelector(selectTickers);
	return (
		<div className={`logoSelectorGrid`}>
			{tickers.map((ticker, i) => {
				return (
					<div
						className={`logoSelect ${color} ${ticker === selected ? 'selected' : ''}`}
						data-ticker={ticker}
						onClick={selectorHandler}
						key={i}
					>
						{getIcon(ticker, 'icon--sm icon--white')}
					</div>
				);
			})}
		</div>
	);
};

export default LogoSelectorGrid;
