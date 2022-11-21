import {
	CG_ERROR_STATUS_OVERLOAD,
	CG_ERROR_STATUS_UNAVAILABLE,
	ERROR_CODE_TIME_LIMIT,
	FETCH_TIME_LIMIT_MS,
} from '../utils/consts';

export const tickerId = {
	btc: 'bitcoin',
	eth: 'ethereum',
	bnb: 'binancecoin',
	ada: 'cardano',
	sol: 'solana',
	avax: 'avalanche-2',
	flow: 'flow',
	ftm: 'fantom',
	icp: 'internet-computer',
	xlm: 'stellar',
	near: 'near',
	matic: 'matic-network',
	egld: 'elrond-erd-2',
	xtz: 'tezos',
	algo: 'algorand',
	hbar: 'hedera-hashgraph',
	trx: 'tron',
	atom: 'cosmos',
	dot: 'polkadot',
	neo: 'neo',
	eos: 'eos',
};

const smallestNumber = (...nums) => {
	return nums.reduce((curr, prev) => (curr < prev ? curr : prev));
};

export const formatCoinGeckoPriceHistory = (data) => {
	const prices = data.prices.map((pricePoint) => {
		return { x: pricePoint[0], y: pricePoint[1] };
	});
	const volumes = data.total_volumes.map((volumePoint) => {
		return { x: volumePoint[0], y: volumePoint[1] };
	});
	const mCaps = data.market_caps.map((marketCapPoint) => {
		return { x: marketCapPoint[0], y: marketCapPoint[1] };
	});
	const shortestLength = smallestNumber(prices.length, volumes.length, mCaps.length);
	const formattedPriceHistory = {
		priceHistory: prices.slice(-shortestLength),
		volumeHistory: volumes.slice(-shortestLength),
		mCapHistory: mCaps.slice(-shortestLength),
	};
	return formattedPriceHistory;
};

const getTimeStampInSeconds = (date) => {
	return Math.floor(date.getTime() / 1000);
};

async function fetchWithTimeLimit(timeLimit, url, failureValue) {
	let timeout;
	const timeoutPromise = new Promise((resolve, reject) => {
		timeout = setTimeout(() => {
			resolve(failureValue);
		}, timeLimit);
	});
	const response = await Promise.race([fetch(url), timeoutPromise]);
	if (timeout) clearTimeout(timeout);
	return response;
}

export const fetchMarketDataHistory = async (
	ticker,
	tStart = getTimeStampInSeconds(new Date('2010-01-01')),
	tEnd = getTimeStampInSeconds(new Date())
) => {
	try {
		const cgId = tickerId[ticker];
		const timeLimit = FETCH_TIME_LIMIT_MS;
		const failureVal = ERROR_CODE_TIME_LIMIT;
		const url = `https://api.coingecko.com/api/v3/coins/${cgId}/market_chart/range?vs_currency=usd&from=${tStart}&to=${tEnd}`;
		const response = await fetchWithTimeLimit(timeLimit, url, failureVal);
		// const response = await fetch(
		// 	`https://api.coingecko.com/api/v3/coins/${cgId}/market_chart/range?vs_currency=usd&from=${tStart}&to=${tEnd}`
		// );
		if (response === ERROR_CODE_TIME_LIMIT) throw new Error(ERROR_CODE_TIME_LIMIT);
		if (response.status === CG_ERROR_STATUS_OVERLOAD) throw new Error(CG_ERROR_STATUS_OVERLOAD);
		else if (response.status === CG_ERROR_STATUS_UNAVAILABLE) throw new Error(CG_ERROR_STATUS_UNAVAILABLE);
		if (response.ok) {
			const data = await response.json();
			const formattedMarketData = formatCoinGeckoPriceHistory(data);
			return { ticker, ...formattedMarketData };
		}
		throw new Error('No price history could be found');
	} catch (err) {
		console.warn(err);
		throw err;
	}
};
