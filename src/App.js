import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './screens/Home';
import SlowScreen from './screens/SlowScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slow" element={<SlowScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
