import { ReactComponent as IconOne } from './icon__network--one.svg';
import { ReactComponent as IconUser } from './icon__network--user.svg';
import './IllustrationNetwork.scss';

const IllustrationNetwork = () => {
	return (
		<div className="illustration__container--network">
			<IconOne className="illustration__icon--network" />
			<IconUser className="illustration__icon--network" />
			<IconOne className="illustration__icon--network" />
			<IconUser className="illustration__icon--network" />
			<IconOne className="illustration__icon--network" />
			<IconUser className="illustration__icon--network" />
			<IconOne className="illustration__icon--network" />
			<IconUser className="illustration__icon--network" />
			<IconOne className="illustration__icon--network" />
			<IconUser className="illustration__icon--network" />
		</div>
	);
};

export default IllustrationNetwork;
