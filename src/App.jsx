import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home';
import Generate from './pages/Generate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Services from './components/pages/Services';

function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/generate' exact element={<Generate/>} />
            {/* <Route path='/services' component={Services} /> */}
          </Routes>
      </Router>
    </>
  );
}

export default App;


