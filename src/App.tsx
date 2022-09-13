import React from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import L1PresentationPage from './pages/l1Presentation/L1Presentation.page';
import L1sPage from './pages/layer1s/L1s.page';
import MarketPage from './pages/market/Market.page';
import SignUpPage from './pages/signUp/SignUp.page';
import UserAccountPage from './pages/userAccount/UserAccount.page';

function App() {
	return (
		<div className="App">
			<Header />
			{/* <Home /> */}
			{/* <SignUpPage /> */}
			{/* <L1sPage /> */}
			{/* <L1PresentationPage /> */}
			{/* <MarketPage /> */}
			<UserAccountPage />
			<Footer />
		</div>
	);
}

export default App;
