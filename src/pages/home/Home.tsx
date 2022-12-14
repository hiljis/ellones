import { useEffect } from 'react';
import About from '../../sections/about/About.section';
import Carousel from '../../sections/carousel/Carousel.section';
import Features from '../../sections/features/Features.section';
import HeroHome from '../../sections/heroHome/HeroHome';
import './Home.scss';

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className="home">
			<HeroHome />
			<About />
			<Carousel />
			<Features />
		</main>
	);
};

export default Home;
