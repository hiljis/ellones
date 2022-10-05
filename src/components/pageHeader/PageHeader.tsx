import { useAppSelector } from '../../store/hooks';
import { selectMarketDataStatus } from '../../store/marketData/marketDataSlice';
import BtnLoad from './btnLoad/BtnLoad';
import './PageHeader.scss';

type Props = {
	children: string;
};

const PageHeader: React.FC<Props> = ({ children }) => {
	return (
		<div className="pageHeader">
			<h3 className="pageHeader--text">{children}</h3>
			<BtnLoad />
		</div>
	);
};

export default PageHeader;
