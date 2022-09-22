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

export const formatCoinGeckoPriceHistory = (data) => {
	const prices = data.prices.map((pricePoint) => {
		return { x: pricePoint[0], y: pricePoint[1] };
	});
	const volumes = data.total_volumes.map((volumePoint) => {
		return { x: volumePoint[0], y: volumePoint[1] };
	});
	const marketCaps = data.market_caps.map((marketCapPoint) => {
		return { x: marketCapPoint[0], y: marketCapPoint[1] };
	});
	const formattedPriceHistory = {
		priceHistory: [...prices],
		volumeHistory: [...volumes],
		marketCapHistory: [...marketCaps],
	};
	return formattedPriceHistory;
};

const getTimeStampInSeconds = (date) => {
	return Math.floor(date.getTime() / 1000);
};

export const fetchMarketDataHistory = async (
	cgId,
	tStart = getTimeStampInSeconds(new Date('2010-01-01')),
	tEnd = getTimeStampInSeconds(new Date())
) => {
	try {
		const response = await fetch(
			`https://api.coingecko.com/api/v3/coins/${cgId}/market_chart/range?vs_currency=usd&from=${tStart}&to=${tEnd}`
		);
		if (response.status === 429) throw new Error('429');
		if (response.ok) {
			const data = await response.json();
			const formattedMarketData = formatCoinGeckoPriceHistory(data);
			return formattedMarketData;
		}
		throw new Error('No price history could be found');
	} catch (err) {
		throw err;
	}
};

export const getCoinGeckoMarketDataHistory = async (ticker) => {
	const marketData = await fetchMarketDataHistory(tickerId[ticker]);
	return marketData;
};
