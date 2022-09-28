export const getGradientColors = (id: string) => {
	let colorStart;
	let colorEnd;

	if (id === 'bitcoin') {
		colorStart = 'rgba(255, 100, 0, 1)';
		colorEnd = 'rgba(255, 200, 0, 1)';
	} else if (id === 'ethereum') {
		colorStart = 'rgba(50, 10, 255, 1)';
		colorEnd = 'rgba(150, 250, 255, 1)';
	} else if (id === 'solana') {
		colorStart = 'rgba(150, 50, 225, 1)';
		colorEnd = 'rgba(0, 250, 255, 1)';
	} else if (id === 'avalanche') {
		colorStart = 'rgba(205, 50, 80, 1)';
		colorEnd = 'rgba(255, 120, 130, 1)';
	} else {
		colorStart = 'rgba(0, 0, 0, 1)';
		colorEnd = 'rgba(0, 0, 0, 0.25)';
	}

	return { colorStart, colorEnd };
};

export const getBarBgColor = (ticker: string) => {
	if (ticker === 'btc') return 'rgba(255,150,0,1)';
	if (ticker === 'eth') return 'rgba(0,0,255,1)';
	if (ticker === 'bnb') return 'rgba(0,0,0,1)';
	if (ticker === 'ada') return 'rgba(0,50,200,1)';
	if (ticker === 'sol') return 'rgba(150,0,255,1)';
	if (ticker === 'avax') return 'rgba(255, 0, 50, 1)';
	if (ticker === 'hbar') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'ftm') return 'rgba(0, 50, 255, 1)';
	if (ticker === 'dot') return 'rgba(255, 0, 120, 1)';
	if (ticker === 'icp') return 'rgba(255, 120, 130, 1)';
	if (ticker === 'xlm') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'xtz') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'matic') return 'rgba(150, 0, 255, 1)';
	if (ticker === 'near') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'egld') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'algo') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'flow') return 'rgba(0, 200, 125, 1)';
	if (ticker === 'trx') return 'rgba(250, 0, 0, 1)';
	if (ticker === 'atom') return 'rgba(70, 0, 255, 1)';
	if (ticker === 'neo') return 'rgba(0, 200, 105, 1)';
	if (ticker === 'eos') return 'rgba(0, 0, 0, 1)';
	else return 'rgba(0, 0, 0, 0.5)';
};

export const getBorderColor = (ticker: string) => {
	return 'white';
	if (ticker === 'btc') return 'rgba(255,150,0,0.5)';
	if (ticker === 'eth') return 'rgba(0,0,255,0.5)';
	if (ticker === 'bnb') return 'rgba(0,0,0,0.5)';
	if (ticker === 'ada') return 'rgba(0,50,200,0.5)';
	if (ticker === 'sol') return 'rgba(150,0,255,0.5)';
	if (ticker === 'avax') return 'rgba(255, 0, 50, 1)';
	if (ticker === 'hbar') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'ftm') return 'rgba(0, 50, 255, 1)';
	if (ticker === 'dot') return 'rgba(255, 0, 120, 1)';
	if (ticker === 'icp') return 'rgba(255, 120, 130, 1)';
	if (ticker === 'xlm') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'xtz') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'matic') return 'rgba(150, 0, 255, 0.5)';
	if (ticker === 'near') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'egld') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'algo') return 'rgba(0, 0, 0, 1)';
	if (ticker === 'flow') return 'rgba(0, 200, 125, 1)';
	if (ticker === 'trx') return 'rgba(250, 0, 0, 1)';
	if (ticker === 'atom') return 'rgba(70, 0, 255, 1)';
	if (ticker === 'neo') return 'rgba(0, 200, 105, 1)';
	if (ticker === 'eos') return 'rgba(0, 0, 0, 1)';
	else return 'rgba(0, 0, 0, 0.5)';
};
