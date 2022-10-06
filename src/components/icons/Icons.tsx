import { ReactComponent as IconBTC } from '../../assets/svg/L1s/btc.svg';
import { ReactComponent as IconETH } from '../../assets/svg/L1s/eth.svg';
import { ReactComponent as IconBNB } from '../../assets/svg/L1s/bnb.svg';
import { ReactComponent as IconADA } from '../../assets/svg/L1s/ada.svg';
import { ReactComponent as IconSOL } from '../../assets/svg/L1s/sol.svg';
import { ReactComponent as IconFTM } from '../../assets/svg/L1s/ftm.svg';
import { ReactComponent as IconALGO } from '../../assets/svg/L1s/algo.svg';
import { ReactComponent as IconEGLD } from '../../assets/svg/L1s/egld.svg';
import { ReactComponent as IconXLM } from '../../assets/svg/L1s/xlm.svg';
import { ReactComponent as IconXTZ } from '../../assets/svg/L1s/xtz.svg';
import { ReactComponent as IconFLOW } from '../../assets/svg/L1s/flow.svg';
import { ReactComponent as IconHBAR } from '../../assets/svg/L1s/hbar.svg';
import { ReactComponent as IconICP } from '../../assets/svg/L1s/icp.svg';
import { ReactComponent as IconRUNE } from '../../assets/svg/L1s/rune.svg';
import { ReactComponent as IconAVAX } from '../../assets/svg/L1s/avax.svg';
import { ReactComponent as IconATOM } from '../../assets/svg/L1s/atom.svg';
import { ReactComponent as IconDOT } from '../../assets/svg/L1s/dot.svg';
import { ReactComponent as IconEOS } from '../../assets/svg/L1s/eos.svg';
import { ReactComponent as IconMATIC } from '../../assets/svg/L1s/matic.svg';
import { ReactComponent as IconNEAR } from '../../assets/svg/L1s/near.svg';
import { ReactComponent as IconQNT } from '../../assets/svg/L1s/qnt.svg';
import { ReactComponent as IconTRX } from '../../assets/svg/L1s/trx.svg';
import { ReactComponent as IconNEO } from '../../assets/svg/L1s/neo.svg';

export const getIcon = (ticker: string, className: string = '') => {
	if (ticker === 'btc') return <IconBTC className={className} />;
	else if (ticker === 'eth') return <IconETH className={className} />;
	else if (ticker === 'bnb') return <IconBNB className={className} />;
	else if (ticker === 'ada') return <IconADA className={className} />;
	else if (ticker === 'sol') return <IconSOL className={className} />;
	else if (ticker === 'ftm') return <IconFTM className={className} />;
	else if (ticker === 'algo') return <IconALGO className={className} />;
	else if (ticker === 'egld') return <IconEGLD className={className} />;
	else if (ticker === 'xlm') return <IconXLM className={className} />;
	else if (ticker === 'xtz') return <IconXTZ className={className} />;
	else if (ticker === 'flow') return <IconFLOW className={className} />;
	else if (ticker === 'hbar') return <IconHBAR className={className} />;
	else if (ticker === 'icp') return <IconICP className={className} />;
	else if (ticker === 'rune') return <IconRUNE className={className} />;
	else if (ticker === 'avax') return <IconAVAX className={className} />;
	else if (ticker === 'atom') return <IconATOM className={className} />;
	else if (ticker === 'dot') return <IconDOT className={className} />;
	else if (ticker === 'eos') return <IconEOS className={className} />;
	else if (ticker === 'matic') return <IconMATIC className={className} />;
	else if (ticker === 'near') return <IconNEAR className={className} />;
	else if (ticker === 'qnt') return <IconQNT className={className} />;
	else if (ticker === 'trx') return <IconTRX className={className} />;
	else if (ticker === 'neo') return <IconNEO className={className} />;
	else return <>---</>;
};
