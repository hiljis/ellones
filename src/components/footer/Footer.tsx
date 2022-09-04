import LinkSocial from '../linkSocial/LinkSocial';
import LinkText from '../linkText/LinkText';
import LogoFull from '../LogoFull/LogoFull';
import './Footer.scss';
import FooterCopy from './footerCopy/FooterCopy';

const Footer = () => {
	return (
		<section className="footer">
			<div className="footer__cols">
				<div className="footer__col">
					<h4 className="footer__col--header">
						<LogoFull />
					</h4>
					<div className="footer__col--item">
						<LinkText text="support@ellones.com" href="henric.hiljanen@gmail.com" type="email" />
					</div>
					<h5 className="footer__col--subHeader">DATA PROVIDERS</h5>
					<div className="footer__col--item">
						<LinkText text="coingecko" href="#" type="resource" />
					</div>
					<div className="footer__col--item">
						<LinkText text="defilama" href="#" type="resource" />
					</div>
				</div>
				<div className="footer__col">
					<h4 className="footer__col--header">LINKS</h4>
					<div className="footer__col--item">
						<LinkText text="compare" href="#" type="compare" />
					</div>
					<div className="footer__col--item">
						<LinkText text="layer 1s" href="#" type="l1s" />
					</div>
					<div className="footer__col--item">
						<LinkText text="price action" href="#" type="market" />
					</div>
					<div className="footer__col--item">
						<LinkText text="dominance" href="#" type="market" />
					</div>
					<div className="footer__col--item">
						<LinkText text="pairs" href="#" type="market" />
					</div>
				</div>
				<div className="footer__col">
					<h4 className="footer__col--header">RESOUCES</h4>
					<div className="footer__col--item">
						<LinkText text="resource 1" href="#" type="resource" />
					</div>
					<div className="footer__col--item">
						<LinkText text="resource 2" href="#" type="resource" />
					</div>
					<div className="footer__col--item">
						<LinkText text="resource 3" href="#" type="resource" />
					</div>
					<div className="footer__col--item">
						<LinkText text="resource 4" href="#" type="resource" />
					</div>
				</div>
				<div className="footer__col">
					<h4 className="footer__col--header">SOCIALS</h4>
					<div className="footer__col--item">
						<LinkSocial plattform="twitter" />
					</div>
					<div className="footer__col--item">
						<LinkSocial plattform="youtube" />
					</div>
					<div className="footer__col--item">
						<LinkSocial plattform="github" />
					</div>
					<div className="footer__col--item">
						<LinkSocial plattform="facebook" />
					</div>
				</div>
			</div>
			<FooterCopy />
		</section>
	);
};

export default Footer;
