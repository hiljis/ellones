import { useAppSelector } from '../../store/hooks';
import { selectGlobalTheme } from '../../store/theme/theme.slice';
import './BaseBackground.scss';

const BaseBackground: React.FC = () => {
	const theme = useAppSelector(selectGlobalTheme);

	return <div className={`baseBackground ${theme}`}></div>;
};

export default BaseBackground;
