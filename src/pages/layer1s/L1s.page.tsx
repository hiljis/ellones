import L1sGrid from '../../sections/layer1sGrid/L1sGrid.section';
import L1sWhat from '../../sections/layer1sWhat/L1sWhat.section';
import { useAppSelector } from '../../store/hooks';
import { selectProfiles } from '../../store/profiles/profilesSlice';
import './L1s.page.scss';

const L1sPage: React.FC = () => {
	const profiles = useAppSelector(selectProfiles);
	const tickers = profiles.map((profile) => profile.ticker);
	return (
		<main className="layer1sGridPage">
			<L1sGrid tickers={tickers} />
			<L1sWhat />
		</main>
	);
};

export default L1sPage;
