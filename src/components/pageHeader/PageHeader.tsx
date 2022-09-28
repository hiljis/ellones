import './PageHeader.scss';

type Props = {
	children: string;
};

const PageHeader: React.FC<Props> = ({ children }) => {
	return (
		<div className="pageHeader">
			<h3 className="pageHeader--text">{children}</h3>
		</div>
	);
};

export default PageHeader;
