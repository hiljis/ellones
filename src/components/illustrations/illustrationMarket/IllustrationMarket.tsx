import { ReactComponent as IconArrowUp } from './icon__market--arrowUp.svg';
import { ReactComponent as IconArrowDown } from './Icon__market--arrowDown.svg';
import { ReactComponent as IconPlus } from './icon__market--plus.svg';
import { ReactComponent as IconMinus } from './icon__market--minus.svg';
import './IllustrationMarket.scss';

const IllustrationMarket = () => {
	return (
		<div className="illustration__container--market">
			<IconPlus className="illustration__icon--market" />
			<IconArrowUp className="illustration__icon--market" />
			<IconMinus className="illustration__icon--market" />
			<IconArrowDown className="illustration__icon--market" />
			<IconPlus className="illustration__icon--market" />
			<IconArrowUp className="illustration__icon--market" />
		</div>
	);
};

export default IllustrationMarket;
