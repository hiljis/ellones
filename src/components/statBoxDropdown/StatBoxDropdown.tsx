import { useState } from 'react';
import DropdownList from '../dropdownList/dropdownList';
import DropdownListItem from '../dropdownList/dropdownListItem/dropdownListItem';
import { getIcon } from '../icons/Icons';
import './StatBoxDropdown.scss';

type Props = {
	title: string;
	target?: string;
};

const StatBoxDropDown: React.FC<Props> = ({ title }) => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState('');
	const options = ['Bitcoin', 'Ethereum', 'Binance', 'Cardano', 'Solana', 'Avalanche', 'Fantom'];
	const icon = getIcon('sol', 'icon--black icon--sm');

	const handleToggleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className="statBoxDropdown__container">
			<div className="statBox statBox--black">
				<span className="stat">{icon}</span>
				<button className="statTitle statDropdownBtn" type="button" onClick={handleToggleOpen}>
					{title}
					{open ? <span>&uarr;</span> : <span>&darr;</span>}
				</button>
			</div>
			{open ? (
				<DropdownList type="l1s">
					{options.map((option) => (
						<DropdownListItem>{option}</DropdownListItem>
					))}
				</DropdownList>
			) : (
				''
			)}
		</div>
	);
};

export default StatBoxDropDown;
