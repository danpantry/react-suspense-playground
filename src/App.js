import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './screens/Home';
import SlowScreen from './screens/SlowScreen';
import SignUp from './screens/SignUp';

function App() {
  return (
    <React.Suspense fallback={<h1>Suspended!</h1>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/slow" element={<SlowScreen />} />
          <Route path="/sign-up" element={<SignUp nextLocation="/" />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
