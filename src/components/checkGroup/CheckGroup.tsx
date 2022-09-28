import { useId, useState } from 'react';
import './CheckGroup.scss';

type Props = {
	children: { string: string; value: string | number }[];
	selectHandler?: Function;
	initSelected: string | number;
	width: string;
};

const CheckGroup: React.FC<Props> = ({ children, selectHandler, initSelected, width }) => {
	const id = useId();
	const [selected, setSelected] = useState(initSelected);

	const handleOnSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = typeof initSelected === 'number' ? parseInt(e.currentTarget.value) : e.currentTarget.value;
		setSelected(value);
		if (selectHandler) selectHandler(e.currentTarget.value);
	};

	return (
		<form className="checkGroup">
			{children.map(({ string, value }, i) => {
				return (
					<>
						<input
							className="checkGroup--input"
							type="radio"
							id={`${id}-${i}`}
							value={value}
							checked={selected === value}
							onChange={handleOnSelect}
							name={`checkGroup-${id}`}
						/>
						<label className={`checkGroup--label ${width}`} htmlFor={`${id}-${i}`}>
							{string}
						</label>
					</>
				);
			})}
		</form>
	);
};

export default CheckGroup;
