import LinkSocial from '../../components/linkSocial/LinkSocial';
import LinkText from '../../components/linkText/LinkText';
import LogoFull from '../../components/LogoFull/LogoFull';
import './Footer.scss';
import FooterCopy from './footerCopy/FooterCopy';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__cols">
				<div className="footer__col footer__col--company">
					<div className="footer__col--header logo">
						<LogoFull invert={true} />
					</div>
					<div className="footer__col--item email">
						<LinkText to="henric.hiljanen@gmail.com" type="email">
							support@ellones.com
						</LinkText>
					</div>
					<h5 className="footer__col--subHeader">DATA PROVIDERS</h5>
					<div className="footer__col--item">
						<LinkText to="https://www.coingecko.com/" type="resource">
							coingecko
						</LinkText>
					</div>
					<div className="footer__col--item">
						<LinkText to="https://defillama.com/" type="resource">
							defilama
						</LinkText>
					</div>
				</div>
				<div className="footer__col footer__col--links">
					<h4 className="footer__col--header">LINKS</h4>
					<div className="footer__col--item">
						<LinkText to="/charts" type="charts">
							charts
						</LinkText>
					</div>
					<div className="footer__col--item">
						<LinkText to="/l1s" type="l1s">
							layer 1s
						</LinkText>
					</div>
					<div className="footer__col--item">
						<LinkText to="/change" type="market">
							change
						</LinkText>
					</div>
					<div className="footer__col--item">
						<LinkText to="/dominance" type="market">
							dominance
						</LinkText>
					</div>
					<div className="footer__col--item">
						<LinkText to="/pairs" type="market">
							pairs
						</LinkText>
					</div>
				</div>
				<div className="footer__col footer__col--resources">
					<h4 className="footer__col--header">RESOUCES</h4>
					<div className="footer__col--item">
						<LinkText to="" type="resource">
							resource 1
						</LinkText>
					</div>
					<div className="footer__col--item">
						<LinkText to="" type="resource">
							resource 2
						</LinkText>
					</div>
					<div className="footer__col--item">
						<LinkText to="" type="resource">
							resource 3
						</LinkText>
					</div>
					<div className="footer__col--item">
						<LinkText to="" type="resource">
							resource 4
						</LinkText>
					</div>
				</div>
				<div className="footer__col footer__col--socials">
					<h4 className="footer__col--header">SOCIALS</h4>
					<div className="footer__col--item">
						<LinkSocial plattform="twitter" href="" withText={true} color="white" />
					</div>
					<div className="footer__col--item">
						<LinkSocial plattform="youtube" href="" withText={true} color="white" />
					</div>
					<div className="footer__col--item">
						<LinkSocial plattform="github" href="" withText={true} color="white" />
					</div>
					<div className="footer__col--item">
						<LinkSocial plattform="facebook" href="" withText={true} color="white" />
					</div>
				</div>
			</div>
			<FooterCopy />
		</footer>
	);
};

export default Footer;
