import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './screens/Home';
import SlowScreen from './screens/SlowScreen';
import SignUp from './screens/SignUp';
import UserProfile from './screens/UserProfile';
import Todos from './screens/Todos';
import AuthBoundary from './AuthBoundary';

function App() {
  return (
    <React.Suspense fallback={<h1>Suspended!</h1>}>
      <Router>
        <AuthBoundary fallback={<Navigate to="/sign-up" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/slow" element={<SlowScreen />} />
            <Route path="/sign-up" element={<SignUp nextLocation="/" />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </AuthBoundary>
      </Router>
    </React.Suspense>
  );
}

export default App;
