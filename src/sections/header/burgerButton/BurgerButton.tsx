import { useState } from 'react';
import BurgerNav from '../burgerNav/BurgerNav';
import './BurgerButton.scss';

const BurgerButton: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleOnToggle = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<button
				className={`burgerButton ${menuOpen ? 'open' : 'closed'}`}
				type="button"
				title="Toggle menu"
				onClick={handleOnToggle}
			>
				<span className="burgerButton__lines"></span>
			</button>
			<BurgerNav open={menuOpen} closeHandler={handleOnToggle} />
		</>
	);
};

export default BurgerButton;
