import { useAppSelector } from '../../store/hooks';
import { selectMarketDataStatus } from '../../store/marketData/marketDataSlice';
import BtnLoad from './btnLoad/BtnLoad';
import './PageHeader.scss';

type Props = {
	children: string;
	showLoad?: boolean;
};

const PageHeader: React.FC<Props> = ({ children, showLoad }) => {
	return (
		<div className="pageHeader">
			<h3 className="pageHeader--text">{children}</h3>
			{showLoad ? <BtnLoad /> : ''}
		</div>
	);
};

export default PageHeader;
