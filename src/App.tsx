import React from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import SignUpPage from './pages/signUp/SignUp.page';

function App() {
	return (
		<div className="App">
			<Header />
			{/* <Home /> */}
			<SignUpPage />
			<Footer />
		</div>
	);
}

export default App;
