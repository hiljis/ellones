import { ReactComponent as IconTwitter } from './icons/icon_twitter.svg';
import { ReactComponent as IconFacebook } from './icons/icon_facebook.svg';
import { ReactComponent as IconGithub } from './icons/icon_github.svg';
import { ReactComponent as IconYoutube } from './icons/icon_youtube.svg';
import { ReactComponent as IconDiscord } from './icons/icon_discord.svg';
import './LinkSocial.scss';

type Props = {
	plattform: 'twitter' | 'youtube' | 'facebook' | 'github' | 'discord';
	href: string;
	withText: boolean;
	color?: string;
};

const LinkSocial: React.FC<Props> = ({ plattform, href, withText, color }) => {
	let icon;
	if (plattform === 'twitter') icon = <IconTwitter className={`linkSocial__icon icon--${color}`} />;
	if (plattform === 'facebook') icon = <IconFacebook className={`linkSocial__icon icon--${color}`} />;
	if (plattform === 'github') icon = <IconGithub className={`linkSocial__icon icon--${color}`} />;
	if (plattform === 'youtube') icon = <IconYoutube className={`linkSocial__icon icon--${color}`} />;
	if (plattform === 'discord') icon = <IconDiscord className={`linkSocial__icon icon--${color}`} />;

	if (href === '') {
		return (
			<div className={`linkSocial linkSocial--${plattform}`}>
				{icon}
				{withText && <span>{plattform}</span>}
			</div>
		);
	}
	return (
		<a className={`linkSocial linkSocial--${plattform}`} href={href} target="_blank" rel="noopener noreferrer">
			{icon}
			{withText && <span>{plattform}</span>}
		</a>
	);
};

export default LinkSocial;
