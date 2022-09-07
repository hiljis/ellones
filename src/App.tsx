import React from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Layer1sPage from './pages/layer1s/Layer1s.page';
import SignUpPage from './pages/signUp/SignUp.page';

function App() {
	return (
		<div className="App">
			<Header />
			{/* <Home /> */}
			{/* <SignUpPage /> */}
			<Layer1sPage />
			<Footer />
		</div>
	);
}

export default App;
