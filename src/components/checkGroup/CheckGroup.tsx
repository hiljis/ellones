import { useId, useState } from 'react';
import './CheckGroup.scss';

type Props = {
	children: { string: string; value: string | number }[];
	selectHandler?: Function;
	initSelected: string | number;
	widthSize: string;
	disabled?: boolean;
	title?: string;
};

const CheckGroup: React.FC<Props> = ({ children, selectHandler, initSelected, widthSize, disabled, title }) => {
	const id = useId();
	const [selected, setSelected] = useState(initSelected);

	const handleOnSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = typeof initSelected === 'number' ? parseInt(e.currentTarget.value) : e.currentTarget.value;
		setSelected(value);
		if (selectHandler) selectHandler(value);
	};

	return (
		<div className="checkGroupContainer">
			<h5 className="checkGroupHeader">{title}</h5>
			<form className={`checkGroup ${disabled && 'disabled'}`}>
				{children.map(({ string, value }, i) => {
					return (
						<div className={`checkContainer ${value === -1 ? 'disabled' : ''}`} key={i}>
							{/* <div className={`checkContainer`} key={i}> */}
							<input
								className={`checkGroup--input`}
								type="radio"
								id={`${id}-${i}`}
								value={value}
								checked={selected === value}
								onChange={handleOnSelect}
								name={`checkGroup-${id}`}
							/>
							<label
								className={`checkGroup--label ${widthSize} ${value === -1 ? 'disabled' : ''}`}
								htmlFor={`${id}-${i}`}
							>
								{string}
							</label>
						</div>
					);
				})}
			</form>
		</div>
	);
};

export default CheckGroup;
