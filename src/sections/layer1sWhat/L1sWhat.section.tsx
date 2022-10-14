import { useState } from 'react';
import { ReactComponent as IconArrowDown } from '../../assets/svg/Icon__arrowDown.svg';
import './L1sWhat.section.scss';

const L1sWhat: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true);

	const handleToggleCollapsed = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<section className="section__whatIs">
			<button className="btn--sectionWide" onClick={handleToggleCollapsed} type="button">
				<p className="question">What is a L1?</p>
				<IconArrowDown className="btn--sectionWide--icon" />
			</button>

			<div className={`answer--container ${collapsed ? 'collapsed' : ''}`}>
				<p className="answer--text">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi cupiditate architecto ullam ex
					alias. Maxime dolorum fugiat, eius architecto nihil dolore nam? Ut blanditiis aliquid facere sunt
					itaque adipisci alias. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi cupiditate
					architecto ullam ex alias. Maxime dolorum fugiat, eius architecto nihil dolore nam? Ut blanditiis
					aliquid facere sunt itaque adipisci alias.
				</p>
			</div>
		</section>
	);
};

export default L1sWhat;
