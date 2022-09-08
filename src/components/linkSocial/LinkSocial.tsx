import { ReactComponent as IconTwitter } from './icons/icon_twitter.svg';
import { ReactComponent as IconFacebook } from './icons/icon_facebook.svg';
import { ReactComponent as IconGithub } from './icons/icon_github.svg';
import { ReactComponent as IconYoutube } from './icons/icon_youtube.svg';
import './LinkSocial.scss';

type LinkSocialProps = {
	plattform: 'twitter' | 'youtube' | 'facebook' | 'github';
	href: string;
	withText: boolean;
};

const LinkSocial = (props: LinkSocialProps) => {
	return (
		<a className={`linkSocial linkSocial--${props.plattform}`} href={props.href} rel="noopener noreferrer">
			{props.plattform === 'twitter' ? <IconTwitter className="linkSocial__icon" /> : ''}
			{props.plattform === 'facebook' ? <IconFacebook className="linkSocial__icon" /> : ''}
			{props.plattform === 'github' ? <IconGithub className="linkSocial__icon" /> : ''}
			{props.plattform === 'youtube' ? <IconYoutube className="linkSocial__icon" /> : ''}
			{props.withText ?? props.plattform}
		</a>
	);
};

export default LinkSocial;
