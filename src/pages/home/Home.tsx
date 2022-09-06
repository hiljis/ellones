import Carousel from '../../sections/carousel/Carousel.section';
import Features from '../../sections/features/Features.section';
import HeroHome from '../../sections/heroHome/HeroHome';
import './Home.scss';

const Home = () => {
	return (
		<main className="home">
			<HeroHome />
			<Carousel visibleCards={5} />
			<Features />
		</main>
	);
};

export default Home;
