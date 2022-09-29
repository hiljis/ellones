import './PageContainer.scss';

type Props = {
	children: React.ReactNode;
};

const PageContainer: React.FC<Props> = ({ children }) => {
	return <main className="pageContainer">{children}</main>;
};

export default PageContainer;
