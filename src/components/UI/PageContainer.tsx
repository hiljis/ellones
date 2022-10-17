import { useEffect } from 'react';
import './PageContainer.scss';

type Props = {
	children: React.ReactNode;
};

const PageContainer: React.FC<Props> = ({ children }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return <main className="pageContainer">{children}</main>;
};

export default PageContainer;
