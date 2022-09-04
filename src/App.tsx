import React from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {
	return (
		<div className="App">
			<Header />
			<div className="content">CONTENT</div>
			<Footer />
		</div>
	);
}

export default App;
