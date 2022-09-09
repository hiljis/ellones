import { useState } from 'react';
import './MarketList.section.scss';

type State = {
	sortBy: string;
};

const initState: State = {
	sortBy: 'marketCap',
};

const MarketList: React.FC = () => {
	const [state, setState] = useState(initState);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		console.log(e.target);
		setState({ ...state, sortBy: 'marketCap' });
	};

	return (
		<section className="section__marketList">
			<div className="marketList">
				<div className="marketList__headers">
					<h5
						className="marketList__colHeader marketList__colHeader--ticker col--ticker"
						onClick={handleClick}
					>
						TICKER
					</h5>
					<h5 className="marketList__colHeader col--price" onClick={handleClick}>
						PRICE
					</h5>
					<div className="marketList__btnGroup ">
						<button className="marketList__btn--target" title="Price" type="button">
							PRICE
						</button>
						<button className="marketList__btn--target" title="Market Cap" type="button">
							M.CAP
						</button>
						<button className="marketList__btn--target" title="Trade Volume" type="button">
							VOLUME
						</button>
						<button className="marketList__btn--target" title="Daily Active Users" type="button">
							DAU's
						</button>
					</div>
					<h5 className="marketList__colHeader col--24h" onClick={handleClick}>
						24H
					</h5>
					<h5 className="marketList__colHeader col--1w" onClick={handleClick}>
						1W
					</h5>
					<h5 className="marketList__colHeader col--1m" onClick={handleClick}>
						1M
					</h5>
					<h5 className="marketList__colHeader col--3m" onClick={handleClick}>
						3M
					</h5>
					<h5 className="marketList__colHeader col--6m" onClick={handleClick}>
						6M
					</h5>
					<h5 className="marketList__colHeader col--1y" onClick={handleClick}>
						1Y
					</h5>
					<h5 className="marketList__colHeader col--3y" onClick={handleClick}>
						3Y
					</h5>
					<input
						className="marketList__input marketList__input--from col--range"
						type="date"
						id="from"
						name="target from"
						min="2018-01-01"
						max="2022-09-01"
						placeholder="yyyy-mm-dd"
					/>
					<input
						className="marketList__input marketList__input--to col--range"
						type="date"
						id="to"
						name="target to"
						min="2018-01-01"
						max="2022-09-01"
						placeholder="yyyy-mm-dd"
					/>
					<h5 className="marketList__colHeader col--mCap" onClick={handleClick}>
						MARKET CAP
					</h5>
				</div>
				<ul className="marketList__list">
					<li className="marketList__listRow">
						<span className="rowItem col--ticker">BTC</span>
						<span className="rowItem col--price">$20 000</span>
						<span className="rowItem procentDot procentDot--pos col--24h">-12.5%</span>
						<span className="rowItem procentDot procentDot--neg col--1w">-8%</span>
						<span className="rowItem procentDot procentDot--neu col--1m">-5%</span>
						<span className="rowItem procentDot procentDot--neu col--3m">-1%</span>
						<span className="rowItem procentDot procentDot--pos col--6m">5%</span>
						<span className="rowItem procentDot procentDot--pos col--1y">10%</span>
						<span className="rowItem procentDot procentDot--pos col--3y">11.9%</span>
						<span className="rowItem procentDot procentDot--neg col--range">3.3%</span>
						<span className="rowItem col--mCap">350 B</span>
					</li>
					<li className="marketList__listRow">
						<span className="rowItem col--ticker">BTC</span>
						<span className="rowItem col--price">$20 000</span>
						<span className="rowItem procentDot procentDot--pos col--24h">-12.5%</span>
						<span className="rowItem procentDot procentDot--neu col--1w">-8%</span>
						<span className="rowItem procentDot procentDot--pos col--1m">-5%</span>
						<span className="rowItem procentDot procentDot--neg col--3m">-1%</span>
						<span className="rowItem procentDot procentDot--neg col--6m">5%</span>
						<span className="rowItem procentDot procentDot--neg col--1y">10%</span>
						<span className="rowItem procentDot procentDot--neg col--3y">11.9%</span>
						<span className="rowItem procentDot procentDot--neu col--range">3.3%</span>
						<span className="rowItem col--mCap">350 B</span>
					</li>
					<li className="marketList__listRow">
						<span className="rowItem col--ticker">BTC</span>
						<span className="rowItem col--price">$20 000</span>
						<span className="rowItem procentDot procentDot--neu col--24h">-12.5%</span>
						<span className="rowItem procentDot procentDot--pos col--1w">-8%</span>
						<span className="rowItem procentDot procentDot--pos col--1m">-5%</span>
						<span className="rowItem procentDot procentDot--neu col--3m">-1%</span>
						<span className="rowItem procentDot procentDot--neg col--6m">5%</span>
						<span className="rowItem procentDot procentDot--neg col--1y">10%</span>
						<span className="rowItem procentDot procentDot--neg col--3y">11.9%</span>
						<span className="rowItem procentDot procentDot--neg col--range">3.3%</span>
						<span className="rowItem col--mCap">350 B</span>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default MarketList;
