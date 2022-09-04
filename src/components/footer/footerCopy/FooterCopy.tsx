import './FooterCopy.scss';

const FooterCopy = () => {
	const year = new Date().getFullYear();
	return <p className="footer__copy">&#9400; {`Ellones, ${year}`}</p>;
};

export default FooterCopy;
