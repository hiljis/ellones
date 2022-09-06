import Carousel from '../../sections/carousel/Carousel.section';
import Features from '../../sections/features/Features.section';
import './Home.scss';

const Home = () => {
	return (
		<main className="home">
			<Carousel visibleCards={5} />
			<Features />
		</main>
	);
};

export default Home;
