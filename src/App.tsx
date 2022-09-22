import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './sections/footer/Footer';
import Header from './sections/header/Header';
import Home from './pages/home/Home';
import L1PresentationPage from './pages/l1Presentation/L1Presentation.page';
import L1sPage from './pages/layer1s/L1s.page';
import MarketPage from './pages/market/Market.page';
import SignUpPage from './pages/signUp/SignUp.page';
import UserAccountPage from './pages/userAccount/UserAccount.page';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { fetchProfiles, selectProfiles } from './store/profiles/profilesSlice';
import { fetchMarketDataForProfiles } from './store/marketData/marketDataSlice';
import SignOutPage from './pages/signOut/SignOut.page';
import SignInPage from './pages/signIn/SignIn.page';
import { checkUserSession } from './store/user/userSlice';

function App() {
	const profiles = useAppSelector(selectProfiles);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
	});

	useEffect(() => {
		if (!profiles.length) {
			dispatch(fetchProfiles());
		} else if (profiles.length) {
			dispatch(fetchMarketDataForProfiles({ tickers: profiles.map((profile) => profile.ticker) }));
		}
	}, [dispatch, profiles]);

	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/change" element={<MarketPage />} />
				<Route path="/signin" element={<SignInPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/signout" element={<SignOutPage />} />
				<Route path="/account" element={<UserAccountPage />} />
				<Route path="/l1s" element={<L1sPage />} />
				<Route path="/l1s/:ticker" element={<L1PresentationPage />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
