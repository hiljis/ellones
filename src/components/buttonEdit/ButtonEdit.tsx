import { ReactComponent as IconEdit } from './edit.svg';
import './ButtonEdit.scss';

type Props = {
	title: string;
	clickHandler: () => void;
};

const ButtonSelectEdit: React.FC<Props> = ({ title, clickHandler }) => {
	return (
		<button className="btn__selectEdit" type="button" title={title} onClick={clickHandler}>
			<IconEdit className="btn__selectEdit--icon icon--black" />
		</button>
	);
};

export default ButtonSelectEdit;
