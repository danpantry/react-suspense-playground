import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <Route path="/" element={<Home />} />
    </Router>
  );
}

export default App;
