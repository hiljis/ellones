import './About.section.scss';

const About = () => {
	return (
		<section className="section__about" id="sectionAbout">
			<h2 className="section__about__header">Who we are</h2>
			<p className="section__about__text">
				We are a web3 plattform focusing on providing information and data on the digital assets space - mainly
				layer 1 protocols. Our goal is to make web3 accessible, fun and easy to understand using simplistic
				design.
			</p>
			<p className="section__about__text">
				There are thousands of different crypto projects and tokens, and most are sadly scams. We focus on the
				ones that really matter - the base layer protocols. These protocols are the foundation of web3, so why
				not just focusing on them?
			</p>
		</section>
	);
};

export default About;
