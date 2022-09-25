import { useState } from 'react';
import './HistoryCornerPicker.scss';

type Props = {
	selected: string;
	selections: string[];
	selectHandler: (selection: string) => void;
	menuDirection: 'down' | 'right' | 'left';
};

const HistoryCornerPicker: React.FC<Props> = ({ selected, selections, menuDirection, selectHandler }) => {
	const [isOpen, setIsOpen] = useState(false);

	const close = (e: React.MouseEvent<HTMLSpanElement>) => {
		setIsOpen(false);
		const selection = e.currentTarget.dataset.selection!;
		if (selection) selectHandler(selection);
	};

	const open = () => {
		setIsOpen(!isOpen);
	};

	return (
		<td className="history__CornerPicker">
			<button className="history__CornerPicker--btn" type="button" onClick={open}>
				{selected}
			</button>
			<div
				className={`history__CornerPicker--menu ${menuDirection} ${isOpen ? `open--${selections.length}` : ''}`}
			>
				{selections?.map((selection, i) => (
					<span data-selection={selection} onClick={close} key={i}>
						{selection}
					</span>
				))}
			</div>
		</td>
	);
};

export default HistoryCornerPicker;
