import { useEffect } from 'react';
import PageHeader from '../../components/pageHeader/PageHeader';
import PageContainer from '../../components/UI/PageContainer';
import { useAppSelector } from '../../store/hooks';
import { selectPairs } from '../../store/pairs/pairs.slice';
import PairAdderBtn from './pairAdderBtn/PairAdderBtn';
import PairCard from './pairCard/PairCard';
import './Pairs.page.scss';

const PairsPage: React.FC = () => {
	const pairs = useAppSelector(selectPairs);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let content;
	if (pairs.length === 0) {
		content = <p className="message__empty">(No pairs to display)</p>;
	} else {
		content = pairs.map((_, i) => <PairCard index={i} key={i} />);
	}

	return (
		<PageContainer>
			<PageHeader>Pairs</PageHeader>
			{content}
			<PairAdderBtn />
		</PageContainer>
	);
};

export default PairsPage;
