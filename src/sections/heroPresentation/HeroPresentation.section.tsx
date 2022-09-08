import { capFirst } from '../../app/utils/format';
import { getIcon } from '../../components/icons/Icons';
import './HeroPresentation.section.scss';

type Props = {
	l1Name: string;
	ticker: string;
};

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

const HeroPresentation: React.FC<Props> = ({ l1Name, ticker }) => {
	return (
		<section className={`heroPresentation heroPresentation--${ticker}`}>
			<div className="heroPresentation--left">
				<div className="heroPresentation__headerBox">
					<h2 className="heroPresentation__header">{capFirst(l1Name)}</h2>
					{getIcon(ticker, 'icon--sm icon--white')}
				</div>
				<p className="heroPresentation__text">{text}</p>
				<button className="btn btn--invert btn--invert--white" type="button">
					--url--
				</button>
				<h5 className="heroPresentation__giantTicker">{ticker}</h5>
			</div>

			<div className="heroPresentation--right">
				<div className="heroPresentation__statGrid">
					<div className="heroPresentation__statBox heroPresentation__statBox--whiteBlack">
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">99</span>
							<span className="heroPresentation__stat--unit">U</span>
						</p>
						<p className="heroPresentation__statTitle">TITLE</p>
					</div>

					<div className="heroPresentation__statBox heroPresentation__statBox--whiteBlack">
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number"></span>
							<span className="heroPresentation__stat--unit"></span>
						</p>
						<p className="heroPresentation__statTitle"></p>
					</div>

					<div className="heroPresentation__statBox heroPresentation__statBox--whiteBlack">
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">99</span>
							<span className="heroPresentation__stat--unit">U</span>
						</p>
						<p className="heroPresentation__statTitle">TITLE</p>
					</div>

					<div className="heroPresentation__statBox heroPresentation__statBox--whiteBlack">
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">99</span>
							<span className="heroPresentation__stat--unit">U</span>
						</p>
						<p className="heroPresentation__statTitle">TITLE</p>
					</div>

					<div className="heroPresentation__statBox heroPresentation__statBox--whiteBlack">
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">99</span>
							<span className="heroPresentation__stat--unit">U</span>
						</p>
						<p className="heroPresentation__statTitle">TITLE</p>
					</div>

					<div className="heroPresentation__statBox heroPresentation__statBox--whiteBlack">
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">99</span>
							<span className="heroPresentation__stat--unit">U</span>
						</p>
						<p className="heroPresentation__statTitle">TITLE</p>
					</div>

					<div className="heroPresentation__statBox heroPresentation__statBox--whiteBlack">
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">99</span>
							<span className="heroPresentation__stat--unit">U</span>
						</p>
						<p className="heroPresentation__statTitle">TITLE</p>
					</div>

					<div className="heroPresentation__statBox heroPresentation__statBox--whiteBlack">
						<p className="heroPresentation__stat">
							<span className="heroPresentation__stat--number">99</span>
							<span className="heroPresentation__stat--unit">U</span>
						</p>
						<p className="heroPresentation__statTitle">TITLE</p>
					</div>
				</div>

				<div className="heroPresentation__chart heroPresentation__chart--white">CHART</div>
			</div>
		</section>
	);
};

export default HeroPresentation;
