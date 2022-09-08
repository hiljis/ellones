import './LinkButton.scss';

type Props = {
    text: string;
    href: string;
    style: string;
}

const LinkButton: React.FC<Props> = (props) => {
    return <a className={`linkButton linkButton--${props.style}`} href={props.href}>{props.text}</a>
}

export default LinkButton;